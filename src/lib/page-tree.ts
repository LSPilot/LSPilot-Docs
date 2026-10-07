import type { Folder, Item, Node, Root } from 'fumadocs-core/page-tree';

/** 判断一个节点是不是所在文件夹的 index 页面（如 guide/index.mdx）。 */
function isFolderIndexItem(node: Node): node is Item {
  if (node.type !== 'page') return false;

  const ref =
    typeof node.$ref === 'string'
      ? node.$ref
      : typeof node.$id === 'string'
        ? node.$id
        : '';

  return ref === 'index.mdx' || ref.endsWith('/index.mdx');
}

/**
 * 分区落地页（<folder>/index.mdx）不进侧边栏：
 * - 不作为文件夹标题的链接（文件夹标题只负责展开 / 收起，点了不跳转）；
 * - 也不作为同名子项（避免出现「使用指南 → 使用指南」）。
 *
 * 落地页本身仍可通过 URL 访问，并被首页「文档结构」与各页卡片引用。
 */
function dropFolderIndexItems(nodes: Node[]) {
  for (const node of nodes) {
    if (node.type !== 'folder') continue;

    node.children = node.children.filter((child) => !isFolderIndexItem(child));
    dropFolderIndexItems(node.children);
  }
}

export function preparePageTree<T extends Root | Folder>(tree: T): T {
  const prepared = {
    ...tree,
    children: tree.children.filter((node) => !(node.type === 'page' && node.url === '/')),
  };

  dropFolderIndexItems(prepared.children);
  return prepared;
}
