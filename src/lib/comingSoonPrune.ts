import fs from 'node:fs';
import path from 'node:path';

export function shouldKeepHtml(relativePosixPath: string): boolean {
  return relativePosixPath === 'index.html' || relativePosixPath === '404.html';
}

function toPosix(relativePath: string): string {
  return relativePath.split(path.sep).join('/');
}

function walkFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) out.push(...walkFiles(abs));
    else out.push(abs);
  }
  return out;
}

function removeEmptyDirs(root: string): void {
  const walk = (dir: string) => {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return;
    for (const name of fs.readdirSync(dir)) walk(path.join(dir, name));
    if (dir === root) return;
    if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
  };
  walk(root);
}

export function pruneComingSoonDist(distRoot: string): void {
  for (const abs of walkFiles(distRoot)) {
    if (path.extname(abs).toLowerCase() !== '.html') continue;
    const rel = toPosix(path.relative(distRoot, abs));
    if (!shouldKeepHtml(rel)) fs.unlinkSync(abs);
  }
  removeEmptyDirs(distRoot);
}
