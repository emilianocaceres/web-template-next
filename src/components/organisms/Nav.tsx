import type { SideLink } from './Sidebar';

import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useCheckActiveNav } from '@/hooks/UseCheckActiveNav';
import { ButtonCustom, buttonVariants } from '../atoms/ButtonCustom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
    isCollapsed: boolean;
    links: SideLink[];
    closeNav: () => void;
}

export function Nav({ links, isCollapsed, className, closeNav }: NavProps) {
    const renderLink = ({ sub, ...rest }: SideLink) => {
        const key = `${rest.title}-${rest.href}`;

        if (isCollapsed && sub)
            return <NavLinkIconDropdown {...rest} key={key} closeNav={closeNav} sub={sub} />;

        if (isCollapsed) return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

        if (sub) return <NavLinkDropdown {...rest} key={key} closeNav={closeNav} sub={sub} />;

        return <NavLink {...rest} key={key} closeNav={closeNav} />;
    };

    return (
        <div
            className={cn(
                'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
                className,
            )}
            data-collapsed={isCollapsed}
        >
            <TooltipProvider delayDuration={0}>
                <nav
                    className={
                        'grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'
                    }
                >
                    {links.map(renderLink)}
                </nav>
            </TooltipProvider>
        </div>
    );
}

interface NavLinkProps extends SideLink {
    subLink?: boolean;
    closeNav: () => void;
}

function NavLink({ title, icon, label, href, closeNav, subLink = false }: NavLinkProps) {
    const { checkActiveNav } = useCheckActiveNav();

    return (
        <Link
            aria-current={checkActiveNav(href) ? 'page' : undefined}
            className={cn(
                buttonVariants({
                    variant: checkActiveNav(href) ? 'secondary' : 'ghost',
                    size: 'sm',
                }),
                'h-12 justify-start text-wrap rounded-none px-6',
                subLink && 'h-10 w-full border-l border-l-slate-500 px-2',
            )}
            href={href}
            onClick={closeNav}
        >
            <div className={'mr-2'}>{icon}</div>
            {title}
            {label ? (
                <div
                    className={
                        'ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'
                    }
                >
                    {label}
                </div>
            ) : null}
        </Link>
    );
}

function NavLinkDropdown({ title, icon, label, sub, closeNav }: NavLinkProps) {
    const { checkActiveNav } = useCheckActiveNav();

    /* Open collapsible by default
     * if one of child element is active */
    const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

    return (
        <Collapsible defaultOpen={isChildActive}>
            <CollapsibleTrigger
                className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    'group h-12 w-full justify-start rounded-none px-6',
                )}
            >
                <div className={'mr-2'}>{icon}</div>
                {title}
                {label ? (
                    <div
                        className={
                            'ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'
                        }
                    >
                        {label}
                    </div>
                ) : null}
                <span
                    className={cn('ml-auto transition-all group-data-[state="open"]:-rotate-180')}
                >
                    <IconChevronDown stroke={1} />
                </span>
            </CollapsibleTrigger>
            <CollapsibleContent asChild className={'collapsibleDropdown'}>
                <ul>
                    {sub!.map((sublink) => (
                        <li key={sublink.title} className={'my-1 ml-8'}>
                            <NavLink {...sublink} subLink closeNav={closeNav} />
                        </li>
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
}

function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
    const { checkActiveNav } = useCheckActiveNav();

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    className={cn(
                        buttonVariants({
                            variant: checkActiveNav(href) ? 'secondary' : 'ghost',
                            size: 'icon',
                        }),
                        'h-12 w-12',
                    )}
                    href={href}
                >
                    {icon}
                    <span className={'sr-only'}>{title}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent className={'flex items-center gap-4'} side={'right'}>
                {title}
                {label ? <span className={'ml-auto text-muted-foreground'}>{label}</span> : null}
            </TooltipContent>
        </Tooltip>
    );
}

function NavLinkIconDropdown({ title, icon, label, sub }: NavLinkProps) {
    const { checkActiveNav } = useCheckActiveNav();

    /* Open collapsible by default
     * if one of child element is active */
    const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

    return (
        <DropdownMenu>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <ButtonCustom
                            className={'h-12 w-12'}
                            size={'icon'}
                            variant={isChildActive ? 'secondary' : 'ghost'}
                        >
                            {icon}
                        </ButtonCustom>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent className={'flex items-center gap-4'} side={'right'}>
                    {title}{' '}
                    {label ? (
                        <span className={'ml-auto text-muted-foreground'}>{label}</span>
                    ) : null}
                    <IconChevronDown className={'-rotate-90 text-muted-foreground'} size={18} />
                </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align={'start'} side={'right'} sideOffset={4}>
                <DropdownMenuLabel>
                    {title} {label ? `(${label})` : ''}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sub!.map(({ title, icon, label, href }) => (
                    <DropdownMenuItem key={`${title}-${href}`} asChild>
                        <Link
                            className={`${checkActiveNav(href) ? 'bg-secondary' : ''}`}
                            href={href}
                        >
                            {icon} <span className={'ml-2 max-w-52 text-wrap'}>{title}</span>
                            {label ? <span className={'ml-auto text-xs'}>{label}</span> : null}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
