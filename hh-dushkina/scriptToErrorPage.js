import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const targetPath = path.join(distDir, '404.html');

if (!fs.existsSync(indexPath)) {
  console.error('Не найден файл:', indexPath);
  process.exit(1);
}

fs.copyFileSync(indexPath, targetPath);
console.log('copied', indexPath, '->', targetPath);