# Nike Store - Complete Startup Guide

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   NIKE STORE - PROJECT STARTUP" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "c:\Users\SREEMSUN\Documents\PROJECTS\Nike Webpage"

# Check if MongoDB is running
Write-Host "[1/3] Checking MongoDB..." -ForegroundColor Yellow
$mongoService = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongoService -and $mongoService.Status -eq "Running") {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB is not running. Starting..." -ForegroundColor Yellow
    Start-Service MongoDB
    Write-Host "✅ MongoDB started" -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/3] Instructions to Start Backend:" -ForegroundColor Yellow
Write-Host "Open a NEW PowerShell terminal and run:" -ForegroundColor Cyan
Write-Host "  cd `"$projectRoot\backend`"" -ForegroundColor White
Write-Host "  .\venv\Scripts\python.exe -m app.main" -ForegroundColor White
Write-Host ""
Write-Host "Backend will be at: http://localhost:8000" -ForegroundColor Green
Write-Host "API Docs will be at: http://localhost:8000/docs" -ForegroundColor Green

Write-Host ""
Write-Host "[3/3] Instructions to Start Frontend:" -ForegroundColor Yellow
Write-Host "Open ANOTHER PowerShell terminal and run:" -ForegroundColor Cyan
Write-Host "  cd `"$projectRoot`"" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Frontend will be at: http://localhost:5173" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SUMMARY" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Backend API: http://localhost:8000" -ForegroundColor White
Write-Host "2. Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "3. API Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to start Backend in this terminal..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "Starting Backend..." -ForegroundColor Green
cd "$projectRoot\backend"
.\venv\Scripts\python.exe -m app.main
