import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

const siteUrl = 'https://ecatessoft.com';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Emir Cem Ateş — Full-stack Developer',
        template: '%s | Emir Cem Ateş',
    },
    description:
        'Portfolio of Emir Cem Ateş. Full-stack developer from Ankara, Turkey — building modern web apps with React, Next.js, TypeScript, Node.js.',
    keywords: [
        'Emir Cem Ateş',
        'ecates',
        'full-stack developer',
        'web developer',
        'React developer',
        'Next.js developer',
        'TypeScript',
        'Node.js',
        'portfolio',
        'Ankara',
        'Turkey',
        'software engineer',
        'freelance developer',
    ],
    authors: [{ name: 'Emir Cem Ateş', url: siteUrl }],
    creator: 'Emir Cem Ateş',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        alternateLocale: 'tr_TR',
        url: siteUrl,
        siteName: 'Emir Cem Ateş',
        title: 'Emir Cem Ateş — Full-stack Developer',
        description:
            'Full-stack developer from Ankara, Turkey — building modern web apps with React, Next.js, TypeScript, Node.js.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Emir Cem Ateş — Full-stack Developer',
        description:
            'Full-stack developer from Ankara, Turkey — building modern web apps with React, Next.js, TypeScript, Node.js.',
        creator: '@emir_ates__',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: siteUrl,
        languages: {
            'en': `${siteUrl}/en`,
            'tr': `${siteUrl}/tr`,
        },
    },
    icons: {
        icon: [
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Emir Cem Ateş',
    url: siteUrl,
    jobTitle: 'Full-stack Developer',
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB'],
    sameAs: [
        'https://github.com/ec4tes',
        'https://linkedin.com/in/emircemates',
        'https://x.com/emir_ates__',
    ],
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ankara',
        addressCountry: 'TR',
    },
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
            <head>
                <meta name="google-site-verification" content="7ZvO4YEP-W3JuvGuSWeVnlIQkl3tkFzLWElmxwF_Zpg" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="antialiased" suppressHydrationWarning>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
