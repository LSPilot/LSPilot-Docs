import { siteDefinition } from '../../config/site.shared';

const siteUrl = (process.env.VITE_SITE_URL || 'https://lspilot.dev').replace(/\/+$/, '');

export const site = {
  ...siteDefinition,
  siteUrl,
  docsUrl: `${siteUrl}${siteDefinition.docsBasePath}`,
};

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, `${site.siteUrl}/`).toString();
}
