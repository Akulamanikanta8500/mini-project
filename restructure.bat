@echo off
echo Running frontend folder extraction...

if not exist "frontend" mkdir frontend

move src frontend\ >nul 2>&1
move public frontend\ >nul 2>&1
move build frontend\ >nul 2>&1
move index.html frontend\ >nul 2>&1
move vite.config.js frontend\ >nul 2>&1
move netlify.toml frontend\ >nul 2>&1
move package.json frontend\ >nul 2>&1
move package-lock.json frontend\ >nul 2>&1
move node_modules frontend\ >nul 2>&1
move .gitignore frontend\ >nul 2>&1
move README.md frontend\ >nul 2>&1
move about.jsx frontend\ >nul 2>&1
move diag_login.js backend\ >nul 2>&1
del check_db.js >nul 2>&1

echo Done! The frontend files have been successfully moved into the "frontend" folder.
echo You can now delete this script file (restructure.bat).
pause
