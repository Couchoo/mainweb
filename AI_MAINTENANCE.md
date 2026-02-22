# 🧠 Couchoo AI Maintenance & Workflow Guide

> [!IMPORTANT]
> **This file is the "Memory" of this project.** Any AI assistant working on this codebase MUST read this file first to understand the architecture, deployment rules, and past critical fixes.

## 🏗️ Project Architecture
- **Frontend**: Next.js (App Router) - Managed by PM2 as `FRONT`.
- **WebSocket Server**: Go (cinema-ws) - Managed by PM2 as `WS`.
- **Database**: MySQL with Prisma ORM.
- **Reverse Proxy**: Caddy (handling SSL and WSS).
- **Hosting**: VPS (Ubuntu 22.04 LTS).

## 🚀 Deployment Workflow
Whenever a change is made locally:
1. **Local**: `git add .`, `git commit -m "..."`, `git push origin main`.
2. **VPS**: Run the automated update script:
   ```bash
   cd /root/mainweb
   ./pull.sh
   ```
   *Note: `pull.sh` automates git pull, npm install, prisma generate, next build, and PM2 restarts.*

## ⚙️ Service Management (PM2)
- **Restart All**: `pm2 restart all`
- **Check Logs**: `pm2 logs FRONT` or `pm2 logs WS`
- **Status List**: `pm2 list`

## 🛡️ Critical Configuration (WSS & SSL)
- **Caddy**: Proxies regular traffic to port 3000 and WebSocket traffic (`/ws`) to port 8080.
- **WebSocket Security**: Must use `wss://couchoo.com/ws` in `.env` for the browser to allow connections on an HTTPS site.
- **Internal Communication**: Next.js talks to Go via `http://127.0.0.1:8080`. Use `127.0.0.1` instead of `localhost` to avoid IPv6 conflicts.

## 💾 Database Gotchas
- **Case Sensitivity**: VPS (Linux) is case-sensitive. Table names in SQL must be lowercase (e.g., `videoserver`, not `VideoServer`) to match Prisma's expectations.
- **Syncing**: Always run `npx prisma db push` after schema changes to ensure the VPS DB matches the code.

## 🛠️ Automated Scripts
- `pull.sh`: Full production update (Next.js + Go).
- `fix-ws.sh`: Specialized fix for Go installation and WebSocket server compilation.
- `db-check.js`: Diagnostic tool to verify DB counts and table integrity.

## 🎨 Design Philosophy
- **Aesthetics**: Premium, dark-mode, cinematic feel.
- **Animations**: Use Framer Motion and Lucide-react icons for micro-interactions.
- **User Experience**: Real-time presence and chat are core to the "Cinema" experience.

---
*Created on 2026-02-22 to ensure no knowledge is lost.*
