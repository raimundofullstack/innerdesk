#!/bin/sh
set -e

echo "🔄 Waiting for database to be ready..."
sleep 5

echo "🔄 Running migrations..."
node -r ts-node/register/transpile-only node_modules/.bin/typeorm migration:run -d dist/config/data-source.js

echo "✅ Starting application..."
exec node dist/server.js
