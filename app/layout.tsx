import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Pokédex - Descubra todos os Pokémon',
    description:
        'Uma Pokédex completa com todos os Pokémon da primeira geração. Explore, pesquise e descubra informações detalhadas sobre seus Pokémon favoritos.',
    keywords: ['pokemon', 'pokedex', 'pokémon', 'primeira geração', 'kanto'],
    authors: [{ name: 'Felipe B' }],
    creator: 'Felipe B',
    metadataBase: new URL('https://pokodex.vercel.app'),
    openGraph: {
        title: 'Pokédex - Descubra todos os Pokémon',
        description:
            'Uma Pokédex completa com todos os Pokémon da primeira geração',
        url: 'https://pokodex.vercel.app',
        siteName: 'Pokédex',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Pokédex - Descubra todos os Pokémon',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pokédex - Descubra todos os Pokémon',
        description:
            'Uma Pokédex completa com todos os Pokémon da primeira geração',
        images: ['/og-image.png'],
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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='pt-BR'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
