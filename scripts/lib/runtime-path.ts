import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export function currentDirFromMetaUrl(metaUrl: string): string {
  return dirname(fileURLToPath(metaUrl));
}
