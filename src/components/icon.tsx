'use client';

/**
 * 一组精选的 Lucide 图标，供 MDX 的 Card 组件按名称引用。
 * 只引入用得到的图标，避免把整个 lucide 图标表打进客户端包。
 */
import {
  Anchor,
  Blocks,
  BookOpen,
  Bot,
  Boxes,
  Braces,
  Bug,
  CodeXml,
  Download,
  FileCode,
  FolderKanban,
  Gauge,
  Globe,
  HardDrive,
  Info,
  Layers,
  LayoutDashboard,
  MessageCircleQuestionMark,
  MessageSquare,
  Palette,
  Plug,
  Puzzle,
  Rocket,
  ScanSearch,
  Search,
  Server,
  Smartphone,
  Sparkles,
  SquareTerminal,
  Wrench,
  Zap,
} from 'lucide-react';

export const ICONS = {
  anchor: Anchor,
  blocks: Blocks,
  book: BookOpen,
  bot: Bot,
  boxes: Boxes,
  braces: Braces,
  bug: Bug,
  code: CodeXml,
  download: Download,
  file: FileCode,
  folder: FolderKanban,
  gauge: Gauge,
  globe: Globe,
  harddrive: HardDrive,
  info: Info,
  layers: Layers,
  layout: LayoutDashboard,
  message: MessageSquare,
  palette: Palette,
  plug: Plug,
  puzzle: Puzzle,
  question: MessageCircleQuestionMark,
  rocket: Rocket,
  scan: ScanSearch,
  search: Search,
  server: Server,
  smartphone: Smartphone,
  sparkles: Sparkles,
  terminal: SquareTerminal,
  wrench: Wrench,
  zap: Zap,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp className={className ?? 'size-4'} />;
}
