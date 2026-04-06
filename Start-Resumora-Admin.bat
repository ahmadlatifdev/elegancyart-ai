@echo off
cd /d "D:\Shakhsy11\MY Plugins\Elegancyart avercel Migration\Elegancy-art\elegancyart-ai"
start cmd /k npm run dev
timeout /t 7 >nul
start http://localhost:3002/admin/profit