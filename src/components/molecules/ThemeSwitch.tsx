import { IconMoon, IconSun } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

import { CButton } from './CButton';

export function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    /* Update theme-color meta tag
     * when theme is updated */
    useEffect(() => {
        const themeColor = theme === 'dark' ? '#020817' : '#fff';
        const metaThemeColor = document.querySelector("meta[name='theme-color']");

        metaThemeColor && metaThemeColor.setAttribute('content', themeColor);
    }, [theme]);

    return (
        <CButton
            className={'rounded-full'}
            size={'icon'}
            variant={'ghost'}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? <IconMoon size={20} /> : <IconSun size={20} />}
        </CButton>
    );
}
