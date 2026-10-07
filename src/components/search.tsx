'use client';

import { create } from '@orama/orama';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { site } from '@/lib/site';

function initOrama() {
  return create({
    schema: { _: 'string' },
    language: 'english',
  });
}

export default function LocalSearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  // 本地 Orama 实例与 fumadocs 内部的类型版本存在差异（运行时一致），这里放宽类型
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    from: site.searchApi,
    initOrama,
    locale,
  } as unknown as Parameters<typeof useDocsSearch>[0]);

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
