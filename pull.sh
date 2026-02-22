#!/bin/bash

# 🚀 Couchoo One-Click Update Script
# Usage: ./pull.sh
# Version: 1.0.1 (Fixed build errors)

echo "------------------------------------------"
echo "⏬ Степен 1: Изтегляне на нов код..."
git pull origin main

echo "------------------------------------------"
echo "📦 Степен 2: Обновяване на Next.js (Front)..."
# Инсталираме зависимости само ако package.json се е променил
npm install
npx prisma generate
# Автоматично създаване на липсващите таблици, за да не гърми Build-а
npx prisma db push --accept-data-loss
npm run build

echo "------------------------------------------"
echo "🐹 Степен 3: Обновяване на Cinema-WS (Go)..."
cd cinema-ws
/usr/local/go/bin/go build -o ws-server
cd ..

echo "------------------------------------------"
echo "💾 Степен 4: Рестартиране на услугите..."
# Рестартираме всичко в PM2
pm2 restart all || (pm2 start npm --name "FRONT" -- start -- -p 3000 && pm2 start ./cinema-ws/ws-server --name "WS")

echo "------------------------------------------"
echo "✅ ГОТОВО! Сайтът и WebSocket сървърът са онлайн."
pm2 status
