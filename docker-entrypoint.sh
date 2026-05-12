#!/bin/sh
set -e
# Start cms-auth service in background (env vars from docker run --env-file)
cd /app/cms-auth && PORT=3000 HOST=127.0.0.1 node server.js &
exec "$@"
