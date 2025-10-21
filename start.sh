#!/usr/bin/env bash
# Start the FastAPI application
cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT
