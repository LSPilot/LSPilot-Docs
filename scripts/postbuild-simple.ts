import { mkdir, writeFile, cp } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';
import { getManifestKey } from '../src/lib/docs-manifest';
import { site } from './lib/site';
import { currentDirFromMetaUrl } from './lib/runtime-path';

const currentDir = currentDirFromMetaUrl(import.meta.url);

function getDocOgPath(slugs: string[]): string {
  if (slugs.length === 0) return `${site.docsBasePath}/og/index.png`;
  return `${site.docsBasePath}/og/${slugs.join('/')}.png`;
}

function getDocMarkdownPath(slugs: string[]): string {
  const segments = [...slugs, 'content.md'];
  return `${site.docsBasePath}/llms.mdx/docs/${segments.join('/')}`;
}

/**
 * 生成 SPA 需要的 docs-manifest.json。
 *
 * 直接复用应用自己的 source（走 Vite 的 SSR 管线加载，因此 import.meta.glob、
 * alias、MDX 集合都与运行时一致），不再手工拼 source。
 */
async function writeDocsManifest() {
  const outputRoot = resolve(currentDir, '../.output/public');
  const distClient = resolve(currentDir, '../dist/client');

  // 这里必须用开发模式：SSR 管线按 dev 转换 JSX（jsxDEV），
  // 若外层 NODE_ENV=production（CI 就是这样）React 会走生产构建，导致 jsxDEV 不存在。
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'development';

  const server = await createServer({
    configFile: resolve(currentDir, '../vite.config.ts'),
    mode: 'development',
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  });

  let manifestContent = '';
  let pageCount = 0;

  try {
    const { source } = (await server.ssrLoadModule('/src/lib/source.ts')) as typeof import('../src/lib/source');
    const { preparePageTree } = (await server.ssrLoadModule('/src/lib/page-tree.ts')) as typeof import('../src/lib/page-tree');

    const pageTree = await source.serializePageTree(preparePageTree(source.getPageTree()));
    const pages = Object.fromEntries(
      await Promise.all(
        source.getPages().map(async (page) => {
          const base = {
            description: page.data.description ?? site.description,
            isIndex: page.slugs.length === 0,
            ogImagePath: getDocOgPath(page.slugs),
            title: page.data.title,
            url: page.url === '/' ? site.docsBasePath : `${site.docsBasePath}${page.url}`,
          };

          return [
            getManifestKey(page.slugs),
            {
              ...base,
              type: 'docs',
              markdownUrl: getDocMarkdownPath(page.slugs),
              path: page.path,
            },
          ];
        }),
      ),
    );

    pageCount = Object.keys(pages).length;
    manifestContent = JSON.stringify({ pageTree, pages }, null, 2);
  } finally {
    await server.close();
    process.env.NODE_ENV = previousNodeEnv;
  }

  await mkdir(outputRoot, { recursive: true });
  await writeFile(resolve(outputRoot, 'docs-manifest.json'), manifestContent, 'utf8');
  // Also copy to dist/client for vite preview
  await mkdir(distClient, { recursive: true });
  await writeFile(resolve(distClient, 'docs-manifest.json'), manifestContent, 'utf8');
  // Also copy to dist/client/docs so it's accessible at /docs/docs-manifest.json
  const docsDir = resolve(distClient, 'docs');
  await mkdir(docsDir, { recursive: true });
  await writeFile(resolve(docsDir, 'docs-manifest.json'), manifestContent, 'utf8');
  console.log(`docs-manifest.json generated with ${pageCount} pages.`);
}

async function copyBaseScopedPublicAssets() {
  const distClient = resolve(currentDir, '../dist/client');
  const publicImages = resolve(currentDir, '../public/images');
  const docsImages = resolve(distClient, 'docs/images');
  const publicBrand = resolve(currentDir, '../public/brand');
  const docsBrand = resolve(distClient, 'docs/brand');
  const publicManifest = resolve(currentDir, '../public/site.webmanifest');
  const docsManifest = resolve(distClient, 'docs/site.webmanifest');

  try {
    await cp(publicImages, docsImages, { recursive: true, force: true });
  } catch {
    // public/images may not exist
  }
  await cp(publicBrand, docsBrand, { recursive: true, force: true });
  await cp(publicManifest, docsManifest, { force: true });
}

await writeDocsManifest();
await copyBaseScopedPublicAssets();

const distClient = resolve(currentDir, '../dist/client');
const shellHtml = resolve(distClient, '_shell.html');
const indexHtml = resolve(distClient, 'index.html');
const notFoundHtml = resolve(distClient, '404.html');
try {
  await cp(shellHtml, indexHtml);
  console.log('Copied _shell.html to index.html for GitHub Pages.');
} catch {
  // _shell.html may not exist
}

// GitHub Pages SPA fallback: serve the app shell on 404 so client-side routing can take over
try {
  await cp(shellHtml, notFoundHtml);
  console.log('Copied _shell.html to 404.html for GitHub Pages SPA fallback.');
} catch {
  // _shell.html may not exist
}

console.log('Postbuild completed: docs-manifest.json generated and assets copied.');
