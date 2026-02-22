#!/bin/bash

# 🚀 Couchoo One-Click Update Script
# Usage: ./pull.sh
# Version: 1.1.0 (Automated Cinema-WS)

echo "------------------------------------------"
echo "⏬ Степен 1: Изтегляне на нов код..."
git pull origin main

echo "------------------------------------------"
echo "📦 Степен 2: Обновяване на Next.js (Front)..."
npm install
npx prisma generate
npx prisma db push --accept-data-loss
npm run build

echo "------------------------------------------"
echo "🐹 Степен 3: Обновяване на Cinema-WS (Go)..."
cd cinema-ws

# Проверка за Go
if ! command -v go &> /dev/null
then
    echo "⚠️ Go не е намерен. Опитваме инсталация чрез apt..."
    sudo apt update && sudo apt install -y golang-go
fi

# Инсталиране на Go зависимости
go mod tidy

# Компилиране
go build -o ws-server
cd ..

echo "------------------------------------------"
echo "💾 Степен 4: Рестартиране на услугите..."
# Рестартираме всичко в PM2 и се уверяваме, че са под правилните имена
pm2 delete FRONT WS 2>/dev/null
pm2 start npm --name "FRONT" -- start -- -p 3000
pm2 start ./cinema-ws/ws-server --name "WS"
pm2 save

echo "------------------------------------------"
echo "✅ ГОТОВО! Сайтът и WebSocket сървърът са онлайн."
pm2 list
