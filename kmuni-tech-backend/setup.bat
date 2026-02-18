@echo off
echo ========================================
echo KMUni Tech Backend - Quick Setup Script
echo ========================================
echo.

REM Check if Chocolatey is installed
where choco >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] Chocolatey not found. Installing Chocolatey...
    echo.
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    echo.
    echo [✓] Chocolatey installed successfully!
    echo Please close and reopen this terminal, then run this script again.
    pause
    exit /b
)

echo [✓] Chocolatey is installed
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] PostgreSQL not found. Installing PostgreSQL...
    choco install postgresql16 -y
    echo.
    echo [✓] PostgreSQL installed successfully!
    echo.
    echo IMPORTANT: Please note the PostgreSQL password shown above.
    echo Default username: postgres
    echo.
    pause
) else (
    echo [✓] PostgreSQL is already installed
)

REM Check if Maven is installed
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] Maven not found. Installing Maven...
    choco install maven -y
    echo.
    echo [✓] Maven installed successfully!
) else (
    echo [✓] Maven is already installed
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Close and reopen your terminal
echo 2. Create database: psql -U postgres -c "CREATE DATABASE kmunitech;"
echo 3. Run backend: mvn spring-boot:run
echo.
pause
