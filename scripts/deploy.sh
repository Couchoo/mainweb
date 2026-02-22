#!/bin/bash

# Couchoo Automatic Deployment Script
# This script runs on the VPS to update the application

PROJECT_DIR="/root/movie-platform" # Adjust this path if needed
WS_DIR="/root/cinema-ws"            # Path to Go WebSocket server

echo "🔄 Starting deployment update..."

# 1. Update Code
cd $PROJECT_DIR
git pull origin main

# 2. Next.js App Update
echo "📦 Updating Next.js app..."
npm install
npm run build
npx prisma generate
npx prisma migrate deploy

# 3. Go WebSocket Server Update
echo "🐹 Updating Go WebSocket server..."
cd $WS_DIR
git pull origin main
go build -o ws-server

# 4. Restart Services with PM2
echo "💾 Restarting services..."
pm2 restart all || pm2 start npm --name "FRONT" -- start -- -p 3000

echo "✅ Deployment successful!"
pm2 status
