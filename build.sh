#!/usr/bin/env bash
# Exit on error, undefined vars, and fail on first error in a pipeline
set -euo pipefail

echo "[build.sh] Python version: $(python --version 2>&1)"
echo "[build.sh] Upgrading pip/setuptools/wheel..."
python -m pip install --upgrade pip setuptools wheel

echo "[build.sh] Installing backend requirements..."
python -m pip install --no-cache-dir -r backend/requirements.txt

echo "[build.sh] Done."
