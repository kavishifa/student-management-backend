import os
import subprocess
import shutil
from pathlib import Path

os.chdir("c:\\work\\my-app")

print("=" * 50)
print("GitHub Pages Deployment Script")
print("=" * 50)

# Verify build exists
if not Path("build/index.html").exists():
    print("ERROR: build/index.html not found!")
    exit(1)

print("\n✓ Build folder verified")

# Add build to git
print("\n→ Adding build files to git...")
subprocess.run(["git", "add", "build", ".gitignore"], check=True)

# Commit
print("→ Committing changes...")
result = subprocess.run(["git", "commit", "-m", "Deploy build to GitHub Pages"], 
                       capture_output=True, text=True)
if "nothing to commit" not in result.stdout and result.returncode != 0:
    print("  Warning:", result.stderr[:100])

# Push main
print("→ Pushing main branch...")
subprocess.run(["git", "push", "origin", "main"], check=True)
print("✓ Main branch pushed")

# Create orphan gh-pages branch
print("\n→ Creating gh-pages branch...")
try:
    subprocess.run(["git", "branch", "-D", "gh-pages"], capture_output=True)
except:
    pass

# Switch to orphan gh-pages
subprocess.run(["git", "checkout", "--orphan", "gh-pages"], check=True)

# Clear working directory
print("→ Preparing gh-pages branch...")
subprocess.run(["git", "rm", "-rf", "--cached", "."], capture_output=True)

# Copy build files
for item in Path("../gh-pages-temp").glob("*") if Path("../gh-pages-temp").exists() else []:
    shutil.rmtree(item) if item.is_dir() else os.remove(item)

build_files = Path("build")
if build_files.exists():
    for item in build_files.iterdir():
        if item.is_dir:
            shutil.copytree(item, item.name, dirs_exist_ok=True)
        else:
            shutil.copy2(item, item.name)

# Commit and push
print("→ Committing to gh-pages...")
subprocess.run(["git", "add", "."], check=True)
subprocess.run(["git", "commit", "-m", "Deploy: Build files for GitHub Pages"], check=True)

print("→ Pushing gh-pages branch...")
subprocess.run(["git", "push", "-f", "origin", "gh-pages"], check=True)

# Return to main
print("→ Returning to main branch...")
subprocess.run(["git", "checkout", "main"], check=True)

print("\n" + "=" * 50)
print("✓ DEPLOYMENT COMPLETE!")
print("=" * 50)
print("\nYour site is live at:")
print("https://kavishifa.github.io/student-management")
print("\nNote: It may take 1-2 minutes to appear.")
print("=" * 50)
