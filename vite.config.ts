import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import mdx from 'fumadocs-mdx/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { getDocEntries } from './scripts/lib/content';
import { siteDefinition } from './config/site.shared';

const docEntries = await getDocEntries();
const prerenderDocPages = docEntries.map((doc) => ({
  path:
    doc.routeSegments.length === 0
      ? siteDefinition.docsBasePath || '/'
      : `${siteDefinition.docsBasePath}/${doc.routeSegments.join('/')}`.replace(/\/+/g, '/'),
}));

export default defineConfig({
  base: '/',
  server: {
    port: 3000,
  },
  plugins: [
    mdx(await import('./source.config')),
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          crawlLinks: true,
        },
      },
      prerender: {
        failOnError: false,
      },
      pages: [
        ...prerenderDocPages,
        {
          path: `${siteDefinition.docsBasePath}/api/search`.replace(/\/+/g, '/'),
        },
        {
          path: `${siteDefinition.docsBasePath}/llms.txt`.replace(/\/+/g, '/'),
        },
        {
          path: `${siteDefinition.docsBasePath}/llms-full.txt`.replace(/\/+/g, '/'),
        },
      ],
    }),
    react(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@config', replacement: path.resolve(__dirname, './config') },
      { find: 'collections', replacement: path.resolve(__dirname, './.source') },
    ],
  },
});
