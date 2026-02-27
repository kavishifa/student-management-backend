@echo off
setlocal enabledelayedexpansion
cd /d "c:\work\my-app"

set LOG_FILE=deploy.log
echo [%date% %time%] Deployment Started > %LOG_FILE%

echo Checking build folder...
if not exist "build\index.html" (
    echo ERROR: build\index.html not found >> %LOG_FILE%
    echo ERROR: build\index.html not found
    goto :error
)
echo OK - Build verified >> %LOG_FILE%

echo Adding files to git...
git add build .gitignore >> %LOG_FILE% 2>&1

echo Committing...
git commit -m "Deploy: build for GitHub Pages" >> %LOG_FILE% 2>&1

echo Pushing main...
git push origin main >> %LOG_FILE% 2>&1
if errorlevel 1 (
    echo WARNING: Push might have failed >> %LOG_FILE%
)

echo Creating gh-pages branch...
git branch -D gh-pages >nul 2>&1

git checkout --orphan gh-pages >> %LOG_FILE% 2>&1
if errorlevel 1 (
    echo ERROR creating orphan branch >> %LOG_FILE%
    goto :error
)

git rm -rf --cached . >nul 2>&1

echo Copying build files...
for /r "build" %%F in (*) do (
    set "SRCFILE=%%F"
    set "DESTFILE=!SRCFILE:build\=!"
    mkdir "!DESTFILE:~0,-1!" >nul 2>&1
    copy "%%F" "!DESTFILE!" >nul 2>&1
)

echo Adding files...
git add . >> %LOG_FILE% 2>&1

echo Committing to gh-pages...
git commit -m "Deploy GitHub Pages" >> %LOG_FILE% 2>&1

echo Pushing gh-pages...
git push -f origin gh-pages >> %LOG_FILE% 2>&1
if errorlevel 1 (
    echo ERROR pushing gh-pages >> %LOG_FILE%
    goto :error
)

echo Returning to main...
git checkout main >> %LOG_FILE% 2>&1

echo.
echo ================================================
echo SUCCESS - GitHub Pages Deployment Complete!
echo ================================================
echo.
echo Your site is live at:
echo https://kavishifa.github.io/student-management
echo.
echo (It may take 1-2 minutes to appear)
echo.
echo See deploy.log for details.
echo ================================================

goto :end

:error
echo.
echo ================================================
echo DEPLOYMENT FAILED
echo ================================================
echo Check deploy.log for details.
goto :end

:end
pause
