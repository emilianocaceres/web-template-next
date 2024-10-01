import './globals.css';
import type { Metadata } from 'next';
import type { TDictionary } from '@/lang/getDictionary';

import { Poppins } from 'next/font/google';
import clsx from 'clsx';

import { getDictionary } from '@/lang/getDictionary';

import { LayoutProvider } from '../components/containers/LayoutProvider';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: 'Template',
    icons: {
        icon: [{ url: '/isotipo.ico', sizes: '16x16' }],
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const dictionary: TDictionary = await getDictionary();

    return (
        <html lang={'en'}>
            <body
                className={clsx('relative h-full overflow-hidden bg-background', poppins.variable)}
            >
                <LayoutProvider dictionary={dictionary}>{children}</LayoutProvider>
            </body>
        </html>
    );
}
