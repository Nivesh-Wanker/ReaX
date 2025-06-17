#!/bin/bash

REQUIRED_NODE_VERSION="18.18.0"
REQUIRED_NPM_VERSION="9.8.1"

echo "🔄 Loading NVM..."
export NVM_DIR="$HOME/.nvm"
# Load NVM script if it exists
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "🔍 Checking for NVM..."
if ! command -v nvm &> /dev/null; then
    echo "❌ NVM is not loaded. Make sure NVM is installed and sourced."
    exit 1
fi

echo "✅ NVM found. Installing Node $REQUIRED_NODE_VERSION..."
nvm install $REQUIRED_NODE_VERSION
nvm use $REQUIRED_NODE_VERSION
nvm alias default $REQUIRED_NODE_VERSION

echo "🔍 Verifying npm version..."
CURRENT_NPM_VERSION=$(npm -v)

if [ "$CURRENT_NPM_VERSION" != "$REQUIRED_NPM_VERSION" ]; then
  echo "⚠️ npm version is $CURRENT_NPM_VERSION, upgrading to $REQUIRED_NPM_VERSION..."
  npm install -g npm@$REQUIRED_NPM_VERSION
else
  echo "✅ npm is already at required version $REQUIRED_NPM_VERSION"
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "✅ Setup complete. You’re ready to run the frontend!"
