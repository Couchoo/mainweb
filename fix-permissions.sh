#!/bin/bash
# fix-permissions.sh - Ensure upload directories are writable

UPLOAD_DIR="/root/mainweb/public/uploads"
AVATAR_DIR="$UPLOAD_DIR/avatars"

echo "🔧 Fixing permissions for $UPLOAD_DIR..."

# Create directories if they don't exist
mkdir -p "$AVATAR_DIR"

# Set ownership (assuming root for now, or the user running the process)
# chmod 777 is the "nuclear" option, 775 is preferred if group is correct
chmod -R 775 "$UPLOAD_DIR"

echo "✅ Permissions updated for $UPLOAD_DIR"
ls -ld "$UPLOAD_DIR"
ls -ld "$AVATAR_DIR"
