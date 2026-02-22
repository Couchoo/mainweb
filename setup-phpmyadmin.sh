#!/bin/bash

# 🛡️ Couchoo phpMyAdmin Setup Script
# installs phpMyAdmin and sets it up with a custom port or path

echo "------------------------------------------"
echo "🔧 Инсталиране на phpMyAdmin..."
echo "------------------------------------------"

# Обновяване на пакетите
sudo apt update
sudo apt install -y php-fpm php-mysql php-json php-mbstring php-zip php-gd php-xml phpmyadmin

# Настройка на Apache/Nginx (ако има)
# Тъй като ползваме Caddy, най-лесно е да го пуснем като отделен PHP сайт или да линкнем папката

PMA_DIR="/var/www/html/phpmyadmin"
sudo mkdir -p /var/www/html
sudo ln -s /usr/share/phpmyadmin $PMA_DIR

echo "✅ phpMyAdmin е инсталиран в: $PMA_DIR"
echo "ℹ️ За да го ползвате с Caddy, добавете това към Caddyfile:"
echo '------------------------------------------'
echo 'pma.your-ip.com {'
echo '    root * /usr/share/phpmyadmin'
echo '    php_fastcgi unix//run/php/php-fpm.sock'
echo '    file_server'
echo '}'
echo '------------------------------------------'
echo "Уверете се, че сте задали парола за root потребителя в MySQL!"
