import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from './card';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import type React from 'react';
import { LSPilotHome } from './lspilot-home';

function Badge({ text, children }: { type?: string; text?: string; children?: React.ReactNode }) {
  return (
    <span className="mx-1 inline-flex items-center rounded-md border border-fd-border bg-fd-muted px-1.5 py-0.5 align-middle text-xs font-medium text-fd-muted-foreground">
      {text ?? children}
    </span>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Badge,
    Callout,
    Card,
    Cards,
    LSPilotHome,
    File,
    Files,
    Folder,
    Step,
    Steps,
    Tab,
    Tabs,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
