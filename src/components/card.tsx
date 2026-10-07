'use client';

import { Card as FumadocsCard, Cards } from 'fumadocs-ui/components/card';
import type { ComponentProps, ReactNode } from 'react';
import { ICONS } from './icon';

type FumadocsCardProps = ComponentProps<typeof FumadocsCard>;

export interface CardProps extends Omit<FumadocsCardProps, 'icon'> {
  /** 图标：可以传 React 节点，也可以传 ICONS 中的名称（如 "rocket"）。 */
  icon?: ReactNode | string;
}

export function Card({ icon, ...props }: CardProps) {
  if (typeof icon === 'string') {
    const Cmp = ICONS[icon as keyof typeof ICONS];
    return <FumadocsCard {...props} icon={Cmp ? <Cmp /> : undefined} />;
  }

  return <FumadocsCard {...props} icon={icon} />;
}

export { Cards };
