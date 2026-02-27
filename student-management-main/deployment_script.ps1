# GitHub Pages Deployment Script
$logFile = "c:\work\my-app\deploy_output.txt"
$log = @()

$log += "=== GITHUB PAGES DEPLOYMENT LOG ==="
$log += "Start time: $(Get-Date)"
$log += ""

# Change to app directory
cd c:\work\my-app

# Step 1: Add build and .gitignore
$log += "=== STEP 1: git add build .gitignore ==="
& git add build .gitignore 2>&1 | ForEach-Object { $log += $_ }
$log += "Exit code: $LASTEXITCODE"
$log += ""

# Step 2: Commit to main
$log += "=== STEP 2: git commit -m 'Deploy build to GitHub Pages' ==="
& git commit -m "Deploy build to GitHub Pages" 2>&1 | ForEach-Object { $log += $_ }
$log += "Exit code: $LASTEXITCODE"
$log += ""

# Step 3: Push to main
$log += "=== STEP 3: git push origin main ==="
& git push origin main 2>&1 | ForEach-Object { $log += $_ }
$log += "Exit code: $LASTEXITCODE"
$log += ""

# Step 4: Delete old gh-pages branch
$log += "=== STEP 4: git branch -D gh-pages ==="
& git branch -D gh-pages 2>&1 | ForEach-Object { $log += $_ }
$log += "Exit code: $LASTEXITCODE (ignore errors if branch doesn't exist)"
$log += ""

# Step 5: Create orphan gh-pages branch
$log += "=== STEP 5: git checkout --orphan gh-pages ==="
& git checkout --orphan gh-pages 2>&1 | ForEach-Object { $log += $_ }
$log += "Exit code: $LASTEXITCODE"
$log += ""

# Step 6: Remove cached files
$log += "=== STEP 6: git rm -rf --cached . ==="
& git rm -rf --cached . 2>&1 | ForEach-Object { $log += $_ }
$log += "Exit code: $LASTEXITCODE"
$log += ""

# Step 7: Copy files from build
$log += "=== STEP 7: Copy files from build directory ==="
try {
    Copy-Item -Path "build/*" -Destination "." -Recurse -Force -ErrorAction Stop
    $log += "Files copied successfully"
} catch {
    $log += "Error copying files: $_"
}
$log += ""

# Step 8: Add all files
$log += "=== STEP 8: git add . ==="
& git add . 2>&1 | ForEach-Object { $log += $_ }
$log += "Exit code: $LASTEXITCODE"
$log += ""

# Step 9: Commit to gh-pages
$log += "=== STEP 9: git commit -m 'Deploy GitHub Pages' ==="
& git commit -m "Deploy GitHub Pages" 2>&1 | ForEach-Object { $log += $_ }
$log += "Exit code: $LASTEXITCODE"
$log += ""

# Step 10: Force push to gh-pages
$log += "=== STEP 10: git push -f origin gh-pages ==="
& git push -f origin gh-pages 2>&1 | ForEach-Object { $log += $_ }
$log += "Exit code: $LASTEXITCODE"
$log += ""

# Step 11: Switch back to main
$log += "=== STEP 11: git checkout main ==="
& git checkout main 2>&1 | ForEach-Object { $log += $_ }
$log += "Exit code: $LASTEXITCODE"
$log += ""

# Final verification
$log += "=== FINAL VERIFICATION ==="
$log += "Remote branches:"
& git branch -r 2>&1 | ForEach-Object { $log += $_ }
$log += ""

# Check if gh-pages exists
$branches = @(& git branch -r)
if ($branches -match "origin/gh-pages") {
    $log += "STATUS: SUCCESS - gh-pages branch exists on origin"
} else {
    $log += "STATUS: FAILED - gh-pages branch does not exist on origin"
}

$log += ""
$log += "End time: $(Get-Date)"

# Write log to file
$log | Out-File -FilePath $logFile -Encoding UTF8 -Force

# Also display log
Write-Host ($log -join "`n")
