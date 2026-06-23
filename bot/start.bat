@echo off
title AMURKA Bot
cd /d "%~dp0"

:loop
echo [%date% %time%] Bot started
node index.js
echo [%date% %time%] Bot crashed. Restarting in 5 seconds...
timeout /t 5 /nobreak >nul
goto loop
