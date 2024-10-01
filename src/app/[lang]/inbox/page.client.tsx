'use client';

import type { BadgeProps } from '@/components/ui/badge';
import type { TDictionary } from '@/lang/getDictionary';

import type { ColumnDef } from '@tanstack/react-table';

import { format } from 'date-fns';
import { CloudDownloadIcon, ListFilterIcon, PlusIcon } from 'lucide-react';

import { DataTable } from '@/components/organisms/Table/data-table';
import { DataTableColumnHeader } from '@/components/organisms/Table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { ConfirmCaseDeletePopover } from './components/ConfirmCaseDeletePopover';
import { MultipleCaseActionPopover } from './components/MultipleCaseActionPopover';
import { CaseDTO } from '@/types/DTOS/case.dto';

interface Props {
    dictionary: TDictionary;
    cases: CaseDTO[];
}

export default function InboxPage({ dictionary, cases }: Props) {
    const columns = getColumns(dictionary);

    return (
        <>
            <div className={'mb-4 flex justify-between'}>
                <div>
                    <p className={'text-2xl font-bold'}>{dictionary.pages.inbox.title}</p>
                </div>

                <div className={'flex space-x-4'}>
                    <Button variant={'ghost'}>
                        <ListFilterIcon
                            className={'mr-4 h-4 w-4 text-yellow-600 dark:text-yellow-500'}
                        />

                        {dictionary.misc.nouns.filters}
                    </Button>

                    <Button variant={'outline'}>
                        <CloudDownloadIcon className={'mr-4 h-4 w-4'} />

                        {dictionary.misc.verbs.export}
                    </Button>

                    <Button variant={'default'}>
                        <PlusIcon className={'mr-4 h-4 w-4'} />

                        {dictionary.pages.inbox.addCase}
                    </Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={cases}
                dictionary={dictionary}
                handlePaginationChange={undefined}
            />
        </>
    );
}

function getColumns(dictionary: TDictionary): ColumnDef<CaseDTO>[] {
    return [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    aria-label={'Select all'}
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    className={'translate-y-[2px]'}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    aria-label={'Select row'}
                    checked={row.getIsSelected()}
                    className={'translate-y-[2px]'}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorFn: (row) => row.caseNumber,
            id: 'row.caseNumber',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={dictionary.tables.headers.caseNumber}
                />
            ),
        },
        {
            accessorFn: (row) => row.validationDate,
            id: 'validationDate',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={dictionary.tables.headers.validationDate}
                />
            ),
            cell: ({ row }) => <>{format(row.original.validationDate, 'dd/MM/yyyy')}</>,
        },
        {
            accessorFn: (row) => row.fiscalNumber,
            id: 'user.fiscalNumber',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={dictionary.tables.headers.fiscalNumber}
                />
            ),
        },
        {
            // accessorFn: (row) => row.customerUser.customer.name,
            id: 'row.fullName',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={dictionary.tables.headers.userFullName}
                />
            ),
            cell: ({ row }) => <>{row.original.fullName}</>,
        },
        {
            accessorFn: (row) => row.analysisDate,
            id: 'row.analysisDate',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={dictionary.tables.headers.analysisDate}
                />
            ),
            cell: ({ row }) => <>{format(row.original.analysisDate, 'dd/MM/yyyy')}</>,
        },
        {
            accessorFn: (row) => row.risk,
            id: 'row.risk',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={dictionary.tables.headers.risk} />
            ),
            cell: ({ row }) => {
                const colorsMap: Record<CaseDTO['risk'], BadgeProps['variant']> = {
                    HIGH: 'destructive',
                    MEDIUM: 'default',
                    LOW: 'secondary',
                };

                return <Badge variant={colorsMap[row.original.risk]}>{row.original.risk}</Badge>;
            },
        },
        {
            id: 'actions',
            cell: ({ row, table }) => (
                <>
                    <ConfirmCaseDeletePopover c={row.original} dictionary={dictionary} />

                    <MultipleCaseActionPopover
                        cases={table.getSelectedRowModel().rows.map((row) => row.original)}
                        dictionary={dictionary}
                    />
                </>
            ),
        },
    ];
}
