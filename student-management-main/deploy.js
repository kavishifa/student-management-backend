const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectDir = 'c:\\work\\my-app';
const logFile = path.join(projectDir, 'deploy-log.txt');

function log(msg) {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
}

process.chdir(projectDir);
fs.writeFileSync(logFile, 'Deployment started at ' + new Date() + '\n');

log('=' .repeat(50));
log('GitHub Pages Deployment Script');
log('=' .repeat(50));

try {
  // Step 1: Verify build exists
  const buildIndexPath = path.join(projectDir, 'build', 'index.html');
  if (!fs.existsSync(buildIndexPath)) {
    throw new Error('build/index.html not found!');
  }
  log('\n✓ Build folder verified');

  // Step 2: Stage files
  console.log('\n→ Staging build files...');
  execSync('git add build .gitignore', { stdio: 'inherit' });

  // Step 3: Commit
  console.log('→ Creating commit...');
  try {
    execSync('git commit -m "Deploy: build files for GitHub Pages"', { stdio: 'inherit' });
  } catch (e) {
    console.log('  (No changes or already committed)');
  }

  // Step 4: Push main
  console.log('→ Pushing main branch...');
  execSync('git push origin main', { stdio: 'inherit' });

  // Step 5: Create gh-pages
  console.log('\n→ Creating gh-pages branch...');
  try {
    execSync('git branch -D gh-pages 2>nul', { stdio: 'pipe' });
  } catch (e) {}
  
  execSync('git checkout --orphan gh-pages', { stdio: 'inherit' });
  console.log('✓ Orphan branch created');

  // Step 6: Clear and populate
  console.log('→ Preparing files...');
  try {
    execSync('git rm -rf --cached . 2>nul', { stdio: 'pipe' });
  } catch (e) {}

  // Copy build files
  const buildDir = path.join(projectDir, 'build');
  const files = fs.readdirSync(buildDir);
  
  for (const file of files) {
    const src = path.join(buildDir, file);
    const dst = path.join(projectDir, file);
    
    if (fs.statSync(src).isDirectory()) {
      copyDirSync(src, dst);
    } else {
      fs.copyFileSync(src, dst);
    }
  }
  console.log('✓ Build files copied');

  // Step 7: Commit and push
  console.log('→ Committing to gh-pages...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Deploy GitHub Pages"', { stdio: 'inherit' });

  console.log('→ Pushing gh-pages branch...');
  execSync('git push -f origin gh-pages', { stdio: 'inherit' });

  // Step 8: Return to main
  console.log('→ Returning to main...');
  execSync('git checkout main', { stdio: 'inherit' });

  console.log('\n' + '='.repeat(50));
  console.log('✓ DEPLOYMENT COMPLETE!');
  console.log('='.repeat(50));
  console.log('\nYour site is live at:');
  console.log('https://kavishifa.github.io/student-management');
  console.log('\nNote: It may take 1-2 minutes to appear.');

} catch (error) {
  console.error('\n✗ ERROR:', error.message);
  process.exit(1);
}

function copyDirSync(src, dst) {
  if (!fs.existsSync(dst)) {
    fs.mkdirSync(dst, { recursive: true });
  }
  const files = fs.readdirSync(src);
  for (const file of files) {
    const srcFile = path.join(src, file);
    const dstFile = path.join(dst, file);
    if (fs.statSync(srcFile).isDirectory()) {
      copyDirSync(srcFile, dstFile);
    } else {
      fs.copyFileSync(srcFile, dstFile);
    }
  }
}
