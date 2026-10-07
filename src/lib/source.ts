import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/plugins/lucide-icons';
import { docs } from 'collections/server';
import { getDocMarkdownPath, site } from './site';

export const source = loader(docs.toFumadocsSource(), {
  baseUrl: '/',
  plugins: [lucideIconsPlugin()],
});

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  return {
    segments: [...page.slugs, 'content.md'],
    url: getDocMarkdownPath(page.slugs),
  };
}

function getPublicDocUrl(url: string) {
  if (url === '/') return site.docsBasePath;
  return `${site.docsBasePath}${url}`;
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');
  return `# ${page.data.title} (${getPublicDocUrl(page.url)})\n\n${processed}`;
}
