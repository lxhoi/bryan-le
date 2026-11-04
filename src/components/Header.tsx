'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';

export default function Header() {
  const tNav = useTranslations('nav');

  return (
    <header className="site-header" aria-label="Primary navigation">
      <Link href="/" className="brand" aria-label="HOIEST home">
        <Image src="/logo/logomark.svg" alt="HOIEST" width={100} height={40} style={{ height: '60px', width: 'auto' }} priority />
      </Link>
      <nav className="nav-links items-center" aria-label="Site sections">
        <Link href="/" className="hover:opacity-70 transition-opacity">{tNav('work')}</Link>
        <Link href="/about" className="hover:opacity-70 transition-opacity">{tNav('about')}</Link>
        <Link href="/contact" className="bg-black text-white px-6 py-2.5 rounded-[40px] hover:opacity-80 transition-opacity flex items-center" style={{ color: 'white' }}>{tNav('contact')}</Link>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
