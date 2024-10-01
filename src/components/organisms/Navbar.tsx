import type { TDictionary } from '@/lang/getDictionary';

import { Layout } from '../containers/MainLayout';
import { Search } from '../molecules/Search';
import { ThemeSwitch } from '../molecules/ThemeSwitch';
import { UserNav } from '../molecules/UserNav';

export function Navbar({ dictionary }: { dictionary: TDictionary }) {
    return (
        <Layout.Header sticky>
            <Search dictionary={dictionary} />
            <div className={'ml-auto flex items-center space-x-4'}>
                <ThemeSwitch />
                <UserNav dictionary={dictionary} />
            </div>
        </Layout.Header>
    );
}
