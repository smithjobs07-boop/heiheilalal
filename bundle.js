import fs from 'fs';
import path from 'path';

function bundle() {
  const distDir = path.join(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');
  const gameHtmlPath = path.join(process.cwd(), 'game.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html does not exist. Please run npm run build first.');
    process.exit(1);
  }

  let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

  // Find the JS script reference: <script type="module" crossorigin src="/assets/index-xxxxxxxx.js"></script>
  const jsRegex = /<script\s+type="module"\s+crossorigin\s+src="\/assets\/([^"]+)"\s*><\/script>/gi;
  const inlinedJsFiles = [];
  
  // Replace JS script reference with inlined code
  htmlContent = htmlContent.replace(jsRegex, (match, jsFileName) => {
    const jsFilePath = path.join(distDir, 'assets', jsFileName);
    if (fs.existsSync(jsFilePath)) {
      console.log(`Inlining JS: ${jsFileName}`);
      const jsContent = fs.readFileSync(jsFilePath, 'utf8');
      inlinedJsFiles.push(jsFilePath);
      // Wrap in script tag, no src
      return `<script type="module">${jsContent}</script>`;
    } else {
      console.warn(`Warning: JS file not found: ${jsFilePath}`);
      return match;
    }
  });

  // Find the CSS reference: <link rel="stylesheet" crossorigin href="/assets/index-xxxxxxxx.css">
  const cssRegex = /<link\s+rel="stylesheet"\s+crossorigin\s+href="\/assets\/([^"]+)"\s*\/?>/gi;
  const inlinedCssFiles = [];

  // Replace CSS reference with inlined style
  htmlContent = htmlContent.replace(cssRegex, (match, cssFileName) => {
    const cssFilePath = path.join(distDir, 'assets', cssFileName);
    if (fs.existsSync(cssFilePath)) {
      console.log(`Inlining CSS: ${cssFileName}`);
      const cssContent = fs.readFileSync(cssFilePath, 'utf8');
      inlinedCssFiles.push(cssFilePath);
      return `<style>${cssContent}</style>`;
    } else {
      console.warn(`Warning: CSS file not found: ${cssFilePath}`);
      return match;
    }
  });

  // Write the output to BOTH game.html (root) and dist/index.html (production entry)
  fs.writeFileSync(gameHtmlPath, htmlContent, 'utf8');
  fs.writeFileSync(indexHtmlPath, htmlContent, 'utf8');

  console.log(`Successfully bundled single-file standalone HTML to game.html AND dist/index.html!`);
  console.log(`Total size: ${(fs.statSync(gameHtmlPath).size / 1024).toFixed(2)} KB`);

  // Clean up the separate JS and CSS files inside dist/assets to avoid "不知名小文件" confusion
  for (const filePath of [...inlinedJsFiles, ...inlinedCssFiles]) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Cleaned up original asset file: ${path.basename(filePath)}`);
      }
    } catch (err) {
      console.error(`Failed to delete ${filePath}:`, err);
    }
  }

  // Also remove the empty assets directory inside dist if empty
  const assetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    try {
      const files = fs.readdirSync(assetsDir);
      if (files.length === 0) {
        fs.rmdirSync(assetsDir);
        console.log(`Cleaned up empty assets directory.`);
      }
    } catch (err) {
      console.error(`Failed to clean up assets directory:`, err);
    }
  }
}

bundle();
