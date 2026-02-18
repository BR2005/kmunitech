# KMUni Tech Backend - Quick Setup Script for PowerShell
# Run as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "KMUni Tech Backend - Quick Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "[!] This script requires Administrator privileges." -ForegroundColor Red
    Write-Host "Please right-click and select 'Run as Administrator'" -ForegroundColor Yellow
    pause
    exit
}

# Check if Chocolatey is installed
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "[!] Chocolatey not found. Installing Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    Write-Host "[✓] Chocolatey installed successfully!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[✓] Chocolatey is installed" -ForegroundColor Green
}

# Check if PostgreSQL is installed
if (!(Get-Command psql -ErrorAction SilentlyContinue)) {
    Write-Host "[!] PostgreSQL not found. Installing PostgreSQL 16..." -ForegroundColor Yellow
    choco install postgresql16 -y
    Write-Host "[✓] PostgreSQL installed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: Please note the PostgreSQL password shown above." -ForegroundColor Yellow
    Write-Host "Default username: postgres" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "[✓] PostgreSQL is already installed" -ForegroundColor Green
}

# Check if Maven is installed
if (!(Get-Command mvn -ErrorAction SilentlyContinue)) {
    Write-Host "[!] Maven not found. Installing Maven..." -ForegroundColor Yellow
    choco install maven -y
    Write-Host "[✓] Maven installed successfully!" -ForegroundColor Green
} else {
    Write-Host "[✓] Maven is already installed" -ForegroundColor Green
}

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Close and reopen your terminal (or run: refreshenv)" -ForegroundColor White
Write-Host "2. Create database:" -ForegroundColor White
Write-Host "   psql -U postgres -c `"CREATE DATABASE kmunitech;`"" -ForegroundColor Cyan
Write-Host "3. Navigate to backend directory:" -ForegroundColor White
Write-Host "   cd 'E:\SIGMA WD\KM ED TECH\Project-1\kmuni-tech-backend'" -ForegroundColor Cyan
Write-Host "4. Run backend:" -ForegroundColor White
Write-Host "   mvn spring-boot:run" -ForegroundColor Cyan
Write-Host ""
pause
