#!/bin/bash

# Cinema Platform Permission Hardener
# Purpose: Ensures all upload and cache directories have correct ownership and permissions
# to prevent 403/404 errors during file uploads or Next.js builds.

echo "🔒 Hardening permissions for Cinema Platform..."

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT=$SCRIPT_DIR

# Define critical paths
AVATAR_DIR="$PROJECT_ROOT/public/uploads/avatars"
MOVIES_DIR="$PROJECT_ROOT/cinema-movies"
NEXT_DIR="$PROJECT_ROOT/.next"

# Create directories if missing
mkdir -p "$AVATAR_DIR"
mkdir -p "$MOVIES_DIR"

# Set ownership to current user (the one running the script)
# On VPS this is usually root or the web user.
USER=$(whoami)
echo "👤 Setting ownership to $USER..."
sudo chown -R $USER:$USER "$PROJECT_ROOT"

# Set directory permissions (755)
echo "📁 Setting directory permissions (755)..."
find "$PROJECT_ROOT" -type d -exec chmod 755 {} \;

# Set file permissions (644)
echo "📄 Setting file permissions (644)..."
find "$PROJECT_ROOT" -type f -exec chmod 644 {} \;

# Make scripts executable
echo "scripts..."
chmod +x "$PROJECT_ROOT/pull.sh"
chmod +x "$PROJECT_ROOT/fix-permissions.sh"
if [ -f "$PROJECT_ROOT/cinema-ws/build.sh" ]; then
    chmod +x "$PROJECT_ROOT/cinema-ws/build.sh"
fi

# Ensure Uploads directory is writable by the app
echo "🔓 Ensuring upload directories are writable..."
chmod -R 777 "$AVATAR_DIR"
chmod -R 777 "$MOVIES_DIR"

echo "✅ Permissions stabilized!"
