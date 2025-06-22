import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import useHasMounted from '@/common/hooks/useHasMounted';

import HeaderSidebar from './header/HeaderSidebar';
import HeaderTop from './header/HeaderTop';

const NowPlayingBar = dynamic(() => import('../elements/NowPlayingBar'), {
  ssr: false,
});
const NowPlayingCard = dynamic(() => import('../elements/NowPlayingCard'), {
  ssr: false,
});

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(width < 480);
  }, [width]);

  const isDarkTheme =
    hasMounted && (resolvedTheme === 'dark' || resolvedTheme === 'system');

  const router = useRouter();
  const pageName = router.pathname.split('/')[1];

  const isFullPageHeader =
    pageName === 'playground' ||
    pageName === 'blog' ||
    router.pathname.startsWith('/blog/') ||
    router.pathname.startsWith('/learn/');

  if (!hasMounted) return null;

  return (
    <div suppressHydrationWarning>
      <div
        className={clsx(
          'mx-auto max-w-6xl',
          isDarkTheme ? 'dark:text-darkText' : '',
        )}
      >
        {isFullPageHeader ? (
          <div className='flex flex-col xl:pb-8'>
            <HeaderTop />
            <main className='transition-all duration-300'>{children}</main>
          </div>
        ) : (
          <div className='flex flex-col lg:flex-row lg:gap-2 lg:py-4 xl:pb-8'>
            <HeaderSidebar />
            <main className='max-w-[915px] transition-all duration-300 lg:w-4/5'>
              {children}
            </main>
          </div>
        )}
      </div>
      {isMobile ? <NowPlayingCard /> : <NowPlayingBar />}
    </div>
  );
};

export default Layout;
