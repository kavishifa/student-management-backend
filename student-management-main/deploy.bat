@echo off
cd /d "c:\work\my-app"
echo Deploying to GitHub Pages...
echo.

echo Step 1: Verifying build folder...
if not exist "build\index.html" (
    echo ERROR: build\index.html not found!
    exit /b 1
)
echo OK - Build folder verified

echo Step 2: Adding build files to git...
git add build .gitignore
git commit -m "Deploy build to GitHub Pages" || echo No changes to commit

echo Step 3: Pushing main branch...
git push origin main -u

echo Step 4: Creating gh-pages branch...
git branch -D gh-pages 2>nul
git checkout --orphan gh-pages
git rm -rf --cached . 2>nul
copy build\* . /E /Y >nul
git add .
git commit -m "Deploy: GitHub Pages" || echo.
git push origin gh-pages -f

echo Step 5: Returning to main...
git checkout main

echo.
echo Deployment Complete!
echo Your site should be live at: https://kavishifa.github.io/student-management
echo.
pause
