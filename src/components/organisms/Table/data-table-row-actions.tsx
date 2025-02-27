import type { Row } from '@tanstack/react-table';
import type { Task } from '@/types/interfaces/task.interface';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { labels } from '../../../types/data/DataRow';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface DataTableRowActionsProps<TData extends Task> {
    row: Row<TData>;
}

export function DataTableRowActions<TData extends Task>({ row }: DataTableRowActionsProps<TData>) {
    const task: Task = row.original;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={'flex h-8 w-8 p-0 data-[state=open]:bg-muted'} variant={'ghost'}>
                    <DotsHorizontalIcon className={'h-4 w-4'} />
                    <span className={'sr-only'}>Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={'end'} className={'w-[160px]'}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Make a copy</DropdownMenuItem>
                <DropdownMenuItem>Favorite</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={task.label}>
                            {labels.map((label) => (
                                <DropdownMenuRadioItem key={label.value} value={label.value}>
                                    {label.label}
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
