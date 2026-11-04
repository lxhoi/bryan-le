import {redirect} from '@/i18n/routing';

export default async function WorkPage({params, searchParams}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{tab?: string | string[]}>;
}) {
  const {locale} = await params;
  const {tab} = await searchParams;
  const activeTab = typeof tab === 'string' && ['branding', 'ui_ux', 'packaging'].includes(tab) ? tab : undefined;
  redirect({href: activeTab ? {pathname: '/', query: {tab: activeTab}} : '/', locale});
}
