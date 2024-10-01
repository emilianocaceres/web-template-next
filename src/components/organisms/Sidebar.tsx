'use client';

import type { TDictionary } from '@/lang/getDictionary';

import { useEffect, useState } from 'react';
import {
    IconChecklist,
    IconChevronsLeft,
    //IconLayoutDashboard,
    IconMenu2,
    IconX,
} from '@tabler/icons-react';

import { CButton } from '../molecules/CButton';
import { Layout } from '../containers/MainLayout';

import { Nav } from './Nav';

import { cn } from '@/lib/utils';

export interface NavLink {
    title: string;
    label?: string;
    href: string;
    icon: JSX.Element;
}

export interface SideLink extends NavLink {
    sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
    {
        title: 'Casos',
        label: '3',
        href: '/cases',
        sub: [
            {
                title: 'Nuevo Caso',
                href: '/cases/new',
                icon: <IconChecklist size={18} />,
            },
            {
                title: 'Listado de Casos',
                href: '/cases/resolved',
                icon: <IconChecklist size={18} />,
            },
        ],
        icon: <IconChecklist size={18} />,
    },
    {
        title: 'Inbox',
        href: '/inbox',
        icon: <IconChecklist />,
    },
];

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    dictionary: TDictionary;
}

export function Sidebar({ className, isCollapsed, setIsCollapsed }: SidebarProps) {
    const [navOpened, setNavOpened] = useState(false);

    /* Make body not scrollable when navBar is opened */
    useEffect(() => {
        if (navOpened) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [navOpened]);

    return (
        <aside
            className={cn(
                `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${
                    isCollapsed ? 'md:w-14' : 'md:w-64'
                }`,
                className,
            )}
        >
            {/* Overlay in mobile */}
            <div
                className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
                    navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'
                } w-full bg-black md:hidden`}
                onClick={() => setNavOpened(false)}
            />

            <Layout fixed className={navOpened ? 'h-svh' : ''}>
                {/* Header */}
                <Layout.Header
                    sticky
                    className={
                        !isCollapsed
                            ? `z-50 flex justify-between px-4 py-3 shadow-sm md:px-4`
                            : `z-50 flex center p-4 md:p-1`
                    }
                >
                    <div className={` flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>
                        {isCollapsed ? (
                            <img alt={'isotipo'} src={'/isotipo.png'} width={50} />
                        ) : (
                            <img alt={'logo'} className={'w-2/3 h-2/3'} src={'/bind-logo.png'} />
                        )}
                    </div>

                    {/* Toggle Button in mobile */}
                    <CButton
                        aria-controls={'sidebar-menu'}
                        aria-expanded={navOpened}
                        aria-label={'Toggle Navigation'}
                        className={'md:hidden'}
                        size={'icon'}
                        variant={'ghost'}
                        onClick={() => setNavOpened((prev) => !prev)}
                    >
                        {navOpened ? <IconX /> : <IconMenu2 />}
                    </CButton>
                </Layout.Header>

                {/* Navigation links */}
                <Nav
                    className={`z-40 h-full flex-1 overflow-auto ${
                        navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'
                    }`}
                    closeNav={() => setNavOpened(false)}
                    id={'sidebar-menu'}
                    isCollapsed={isCollapsed}
                    links={sidelinks}
                />

                {/* Scrollbar width toggle button */}
                <CButton
                    className={'absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex'}
                    size={'icon'}
                    variant={'outline'}
                    onClick={() => setIsCollapsed((prev) => !prev)}
                >
                    <IconChevronsLeft
                        className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
                        stroke={1.5}
                    />
                </CButton>
            </Layout>
        </aside>
    );
}
