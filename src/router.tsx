import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { NotFound } from '@/components/not-found';

const viteBase = import.meta.env.BASE_URL || '/';

export function getRouter() {
  return createTanStackRouter({
    basepath: viteBase.replace(/\/+$/, ''),
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
  });
}
