@echo off
echo ========================================
echo Nike Store Backend - FastAPI Server
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Checking MongoDB...
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] MongoDB is running
) else (
    sc query MongoDB | find "RUNNING" >nul
    if %errorlevel% equ 0 (
        echo [OK] MongoDB is already running
    ) else (
        echo [ERROR] MongoDB is not running!
        echo Please start MongoDB first: net start MongoDB
        pause
        exit /b 1
    )
)

echo.
echo [2/3] Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo [3/3] Starting FastAPI server...
echo.
echo Server will be available at:
echo - API Docs: http://localhost:8000/docs
echo - Health: http://localhost:8000/health
echo - Products: http://localhost:8000/products/
echo.
echo Press Ctrl+C to stop the server
echo.

python -m app.main

pause
