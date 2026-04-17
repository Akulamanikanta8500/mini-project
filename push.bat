@echo off
echo Prepping files for GitHub Push...
cd /d "%~dp0"

git add .
git commit -m "chore: perfectly separate frontend and backend, fix vercel deploy paths"
git push

echo.
echo Push attempted! Check the messages above to verify if it pushed successfully. 
echo You can delete this script (push.bat) afterwards!
pause
