'use client';

import type { TDictionary } from '@/lang/getDictionary';

import { Layout } from '@/components/containers/MainLayout';
import { Navbar } from '@/components/organisms/Navbar';
import { Sidebar } from '@/components/organisms/Sidebar';
import { useIsCollapsed } from '@/hooks/UseIsCollapsed';
import { ThemeProvider } from '@/providers/ThemeProvider';

interface LayoutProviderProps {
    children: React.ReactNode;
    dictionary: TDictionary;
}

export function LayoutProvider({ children, dictionary }: LayoutProviderProps) {
    const [isCollapsed, setIsCollapsed] = useIsCollapsed();

    return (
        <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute={'class'}
            defaultTheme={'system'}
        >
            <Layout>
                <Sidebar
                    dictionary={dictionary}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                />
            </Layout>

            <main
                className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
                    isCollapsed ? 'md:ml-14' : 'md:ml-64'
                } h-full`}
                id={'content'}
            >
                <Layout>
                    <Navbar dictionary={dictionary} />

                    <div className={'px-6'}>{children}</div>
                </Layout>
            </main>
        </ThemeProvider>
    );
}
