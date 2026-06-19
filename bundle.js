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
  // Replace JS script reference with inlined code
  htmlContent = htmlContent.replace(jsRegex, (match, jsFileName) => {
    const jsFilePath = path.join(distDir, 'assets', jsFileName);
    if (fs.existsSync(jsFilePath)) {
      console.log(`Inlining JS: ${jsFileName}`);
      const jsContent = fs.readFileSync(jsFilePath, 'utf8');
      // Wrap in script tag, no src
      return `<script type="module">${jsContent}</script>`;
    } else {
      console.warn(`Warning: JS file not found: ${jsFilePath}`);
      return match;
    }
  });

  // Find the CSS reference: <link rel="stylesheet" crossorigin href="/assets/index-xxxxxxxx.css">
  const cssRegex = /<link\s+rel="stylesheet"\s+crossorigin\s+href="\/assets\/([^"]+)"\s*\/?>/gi;
  // Replace CSS reference with inlined style
  htmlContent = htmlContent.replace(cssRegex, (match, cssFileName) => {
    const cssFilePath = path.join(distDir, 'assets', cssFileName);
    if (fs.existsSync(cssFilePath)) {
      console.log(`Inlining CSS: ${cssFileName}`);
      const cssContent = fs.readFileSync(cssFilePath, 'utf8');
      return `<style>${cssContent}</style>`;
    } else {
      console.warn(`Warning: CSS file not found: ${cssFilePath}`);
      return match;
    }
  });

  // Write the output to game.html at root
  fs.writeFileSync(gameHtmlPath, htmlContent, 'utf8');
  console.log(`Successfully bundled single-file standalone HTML to game.html! Total size: ${(fs.statSync(gameHtmlPath).size / 1024).toFixed(2)} KB`);
}

bundle();
