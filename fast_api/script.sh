#!/bin/sh

echo "Starting backend..."
exec uvicorn server:app --host 0.0.0.0 --port 8000