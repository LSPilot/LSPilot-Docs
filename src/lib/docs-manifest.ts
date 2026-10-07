import type { SerializedPageTree } from 'fumadocs-core/source/client';

type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

type BaseLoaderData = {
  description: string;
  isIndex: boolean;
  ogImagePath: string;
  pageTree: SerializedPageTree;
  title: string;
  url: string;
};

export type DocsLoaderData = BaseLoaderData & {
  type: 'docs';
  markdownUrl: string;
  path: string;
};

export type LoaderData = DocsLoaderData;

export type DocsManifest = {
  pageTree: SerializedPageTree;
  pages: Record<string, DistributiveOmit<LoaderData, 'pageTree'>>;
};

export function getManifestKey(slugs: string[]) {
  return slugs.join('/');
}
