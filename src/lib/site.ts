import { siteDefinition } from '@config/site.shared';

const viteBase = import.meta.env.BASE_URL || '/';

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function derivePlausibleApiHost(scriptUrl: string): string {
  if (!scriptUrl) return '';

  try {
    const url = new URL(scriptUrl);
    const pathname = url.pathname.replace(/\/js\/[^/]+$/, '') || '/';
    return trimTrailingSlash(new URL(pathname, url.origin).toString());
  } catch {
    return '';
  }
}

const siteUrl = trimTrailingSlash(import.meta.env.VITE_SITE_URL || 'https://lspilot.dev');
const plausibleScriptUrl = trimTrailingSlash(
  import.meta.env.VITE_PLAUSIBLE_SCRIPT_URL || '',
);
const plausibleApiHost = trimTrailingSlash(
  import.meta.env.VITE_PLAUSIBLE_API_HOST || derivePlausibleApiHost(plausibleScriptUrl),
);

export const site = {
  ...siteDefinition,
  siteUrl,
  docsUrl: `${siteUrl}${siteDefinition.docsBasePath}`,
  searchApi: `${viteBase}${siteDefinition.docsBasePath}/api/search`.replace(/\/+/g, '/'),
  llmsUrl: `${viteBase}${siteDefinition.docsBasePath}/llms.txt`.replace(/\/+/g, '/'),
  llmsFullUrl: `${viteBase}${siteDefinition.docsBasePath}/llms-full.txt`.replace(/\/+/g, '/'),
  plausible: {
    enabled: Boolean(plausibleScriptUrl && (import.meta.env.VITE_PLAUSIBLE_DOMAIN || import.meta.env.VITE_ANALYTICS_DOMAIN)),
    domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN || import.meta.env.VITE_ANALYTICS_DOMAIN || 'lspilot.dev/docs',
    scriptUrl: plausibleScriptUrl,
    apiHost: plausibleApiHost,
  },
} as const;

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, `${site.siteUrl}/`).toString();
}

function normalizeAssetPath(pathname: string): string {
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function publicAssetFallbackPath(pathname: string): string {
  const normalized = normalizeAssetPath(pathname);
  const withBase = normalized.startsWith(site.docsBasePath) ? normalized : `${site.docsBasePath}${normalized}`;
  return `${viteBase}${withBase}`.replace(/\/+/g, '/');
}

export function publicAssetPath(pathname: string): string {
  return publicAssetFallbackPath(pathname);
}

export function getDocOgPath(slugs: string[]): string {
  const path = slugs.length === 0 ? `${site.docsBasePath}/og/index.png` : `${site.docsBasePath}/og/${slugs.join('/')}.png`;
  return `${viteBase}${path}`.replace(/\/+/g, '/');
}

export function getDocMarkdownPath(slugs: string[]): string {
  const segments = [...slugs, 'content.md'];
  const path = `${site.docsBasePath}/llms.mdx/docs/${segments.join('/')}`;
  return `${viteBase}${path}`.replace(/\/+/g, '/');
}

export function getDocPath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${viteBase}${site.docsBasePath}${normalized}`.replace(/\/+/g, '/');
}
