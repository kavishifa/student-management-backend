param(
    [Switch]$Force
)

$ErrorActionPreference = "Stop"

# Navigate to project directory
Set-Location "c:\work\my-app"

Write-Host "Building project..." -ForegroundColor Green
npm run build

Write-Host "Checking git status..." -ForegroundColor Green
git status

Write-Host "Adding build folder..." -ForegroundColor Green
git add build/ .gitignore

Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "Deploy: Updated build files for GitHub Pages" -AllowEmptyCommit

Write-Host "Pushing to main..." -ForegroundColor Green
if ($Force) {
    git push origin main --force
} else {
    git push origin main
}

Write-Host "Creating gh-pages branch from build folder..." -ForegroundColor Green
git branch -D gh-pages -q 2>$null
git checkout --orphan gh-pages
git rm -rf --cached . --force 2>$null
Copy-Item -Path ".\build\*" -Destination "." -Recurse -Force
git add .
git commit -m "Deploy build to GitHub Pages"
git push origin gh-pages -f

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "GitHub Pages URL: https://kavishifa.github.io/student-management"
