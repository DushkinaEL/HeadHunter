const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const targetPath = path.join(distDir, '404.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Run build first.');
  process.exit(1);
}

fs.copyFileSync(indexPath, targetPath);
console.log('copied dist/index.html -> dist/404.html');