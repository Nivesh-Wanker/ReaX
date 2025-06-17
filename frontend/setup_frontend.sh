#!/bin/bash

REQUIRED_NODE_VERSION="18.18.0"
REQUIRED_NPM_VERSION="9.8.1"

echo "🔍 Checking for NVM..."
if ! command -v nvm &> /dev/null; then
    echo "❌ NVM not found. Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    echo "✅ NVM installed."
else
    echo "✅ NVM already installed."
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

echo "⬇️ Installing Node.js version $REQUIRED_NODE_VERSION..."
nvm install $REQUIRED_NODE_VERSION
nvm use $REQUIRED_NODE_VERSION
nvm alias default $REQUIRED_NODE_VERSION

echo "🔍 Checking npm version..."
CURRENT_NPM_VERSION=$(npm -v)

if [ "$CURRENT_NPM_VERSION" != "$REQUIRED_NPM_VERSION" ]; then
  echo "⚠️ npm version is $CURRENT_NPM_VERSION, upgrading to $REQUIRED_NPM_VERSION..."
  npm install -g npm@$REQUIRED_NPM_VERSION
else
  echo "✅ npm is already at required version $REQUIRED_NPM_VERSION"
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "✅ All set! Frontend environment is ready to go."
