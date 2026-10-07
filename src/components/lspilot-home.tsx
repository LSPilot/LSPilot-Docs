'use client';

import { ArrowRight, Bot, Braces, Download, ExternalLink, Gauge, Plug, ScanSearch, SquareTerminal } from 'lucide-react';
import { getDocPath } from '@/lib/site';

const REPO = 'https://github.com/Xposed-Modules-Repo/me.yun.lspilot';
const RELEASES = 'https://github.com/Xposed-Modules-Repo/me.yun.lspilot/releases';
const TELEGRAM = 'https://t.me/LSPilot';
const QQ_JOIN =
  'mqqapi://group/join_troop?src_type=internal&version=1&troop_uin=253461997&subsource_id=1030&is_need_jump_aio=1';

const features = [
  { icon: Bot, title: 'AI 逆向助手', desc: '一句话描述目标，AI 自己调用工具定位代码并生成 Hook 脚本。' },
  { icon: ScanSearch, title: '设备上反编译', desc: '内置 jadx 与 DexKit，APK / DEX 直接变成可读源码。' },
  { icon: Braces, title: 'BeanShell 插件', desc: '在目标进程内执行脚本，改完重启应用即生效。' },
  { icon: Plug, title: 'MCP 扩展', desc: '接入远程 MCP 服务器，或把分析流程封装成 AI 工具。' },
  { icon: SquareTerminal, title: '内置终端', desc: 'Xed 终端与 Ubuntu 环境，AI 也能直接执行命令。' },
  { icon: Gauge, title: '观测与检视', desc: '实时布局树、帧率与卡顿堆栈，看清运行时状态。' },
];

const sections: [string, string][] = [
  ['开始使用', '/start/introduction'],
  ['使用指南', '/guide'],
  ['插件开发', '/plugin'],
  ['参考', '/ref'],
  ['帮助', '/help/faq'],
];

const buttonPrimary =
  'inline-flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-medium text-brand-foreground transition-colors hover:opacity-90';
const buttonSecondary =
  'inline-flex h-11 items-center gap-2 rounded-full border border-fd-border bg-fd-card px-6 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-muted';

/** QQ 企鹅图标（simple-icons，与 GitHub / Telegram 图标同风格）。 */
function QqIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673" />
    </svg>
  );
}

export function LSPilotHome() {
  return (
    <div className="not-prose mx-auto flex w-full max-w-3xl flex-col gap-16 px-6 py-16 sm:py-24">
      <header className="flex flex-col items-center gap-6 text-center">
        <img
          src="/brand/logo.webp"
          alt="LSPilot"
          className="size-16 rounded-2xl border border-fd-border object-contain shadow-sm"
        />
        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          把逆向工作台装进一部手机
        </h1>
        <p className="max-w-xl text-sm leading-7 text-fd-muted-foreground sm:text-base">
          手机端的 AI 逆向分析与动态插件调试工具。选中目标应用，就能在它的进程里定位代码、生成 Hook、注入验证。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href={getDocPath('/start/quickstart')} className={buttonPrimary}>
            快速上手
            <ArrowRight className="size-4" />
          </a>
          <a href={RELEASES} className={buttonSecondary}>
            <Download className="size-4" />
            下载最新版
          </a>
          <a href={QQ_JOIN} className={buttonSecondary}>
            <QqIcon className="size-4" />
            加入 QQ 群
          </a>
        </div>
        <p className="text-xs text-fd-muted-foreground">
          Android 14+（API 33）· arm64-v8a · LSPosed
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex gap-3 rounded-xl border border-fd-border bg-fd-card p-4 transition-colors hover:border-brand/40"
            >
              <Icon className="mt-0.5 size-4 shrink-0 text-brand" />
              <div>
                <h2 className="text-sm font-medium text-fd-foreground">{item.title}</h2>
                <p className="mt-1 text-xs leading-6 text-fd-muted-foreground">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="flex flex-col items-center gap-5 rounded-2xl border border-fd-border bg-fd-card p-6 sm:p-8">
        <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">文档</h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {sections.map(([label, href]) => (
            <a
              key={href}
              href={getDocPath(href)}
              className="rounded-full border border-fd-border px-4 py-1.5 text-sm text-fd-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-fd-border pt-8 text-xs text-fd-muted-foreground">
        <a href={REPO} className="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
          GitHub
          <ExternalLink className="size-3" />
        </a>
        <a href={TELEGRAM} className="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
          Telegram
          <ExternalLink className="size-3" />
        </a>
        <a href={getDocPath('/help/troubleshooting')} className="transition-colors hover:text-brand">
          排错手册
        </a>
      </footer>
    </div>
  );
}
