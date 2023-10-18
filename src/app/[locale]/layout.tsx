import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { SiteHeader } from '@/components/SiteHeader';
import ThemeProvider from '@/components/ThemeProvider';

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: Record<string, any>;
}) {
  let messages;
  try {
    messages = (await import(`@/components/messages/${locale}.json`)).default;
  } catch (error) {
    notFound
  }

  return (
    <html lang={locale}>
      <head />
      <body>
        <NextIntlProvider locale={locale} messages={messages}>
          <ThemeProvider locale={locale}>
            <SiteHeader />
            <main>{children}</main>
          </ThemeProvider>
        </NextIntlProvider>
      </body>
    </html>
  );
}

export default function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('site');
  const locale = getLocale();
  const title = t('title');
  const description = t('desc');

  return {
    title,
    description,
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title,
      description,
      url: 'https://nextjs.org',
      siteName: title,
      images: [
        {
          url: 'https://nextjs.org/og.png',
          width: 800,
          height: 600,
        },
        {
          url: 'https://nextjs.org/og-alt.png',
          width: 1800,
          height: 1600,
          alt: 'Custom alt for image',
        },
      ],
      locale,
      type: 'website',
    },
  };
}
