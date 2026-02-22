#!/bin/bash

# Couchoo VPS Baseline Setup Script
# Target OS: Ubuntu 22.04 LTS

echo "🚀 Starting Couchoo Server Setup..."

# Update System
sudo apt update && sudo apt upgrade -y

# Install Basic Dependencies
sudo apt install -y curl wget git build-essential software-properties-common ufw

# 1. Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2

# 2. Install Go 1.22
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
echo "export PATH=\$PATH:/usr/local/go/bin" >> ~/.bashrc
source ~/.bashrc
rm go1.22.0.linux-amd64.tar.gz

# 3. Install MariaDB
sudo apt install -y mariadb-server
sudo systemctl start mariadb
sudo systemctl enable mariadb
# Reminder: Run 'sudo mysql_secure_installation' manually later

# 4. Install Redis
sudo apt install -y redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server

# 5. Install Caddy (Reverse Proxy)
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1G 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1G 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy -y

# 6. Playwright Dependencies (for Scraper)
sudo npx playwright install-deps

# 7. Firewall Setup
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw allow 3000
sudo ufw allow 8080
sudo ufw --force enable

echo "✅ Baseline installation complete!"
echo "👉 Next Steps:"
echo "1. Run 'sudo mysql_secure_installation' to secure your DB."
echo "2. Clone your repository: git clone <repo_url>"
echo "3. Update your .env file."
