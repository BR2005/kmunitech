@echo off
echo Starting KM Unitech EdTech Platform...

echo Starting Backend Server...
start "NestJS Server" cmd /k "cd server && npm run start:dev"

echo Starting Frontend Client...
start "React Client" cmd /k "cd client && npm run dev"

echo All services started! Opening browser...
timeout /t 5
start http://localhost:5173

pause
