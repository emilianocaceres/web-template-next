import type { TDictionary } from '@/lang/getDictionary';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CButton } from './CButton';

export function UserNav({ dictionary }: { dictionary: TDictionary }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <CButton className={'relative h-8 w-8 rounded-full'} variant={'ghost'}>
                    <Avatar className={'h-8 w-8'}>
                        <AvatarImage alt={'@shadcn'} src={'/avatars/01.png'} />
                        <AvatarFallback>SN</AvatarFallback>
                    </Avatar>
                </CButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent forceMount align={'end'} className={'w-56'}>
                <DropdownMenuLabel className={'font-normal'}>
                    <div className={'flex flex-col space-y-1'}>
                        <p className={'text-sm font-medium leading-none'}>satnaing</p>
                        <p className={'text-xs leading-none text-muted-foreground'}>
                            satnaingdev@gmail.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        {dictionary.misc.nouns.profile}
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {dictionary.misc.nouns.billing}
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {dictionary.misc.nouns.settings}
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    {dictionary.misc.nouns.logOut}
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
