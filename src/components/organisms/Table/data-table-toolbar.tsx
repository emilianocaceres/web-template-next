import type { Table } from '@tanstack/react-table';
import type { TDictionary } from '@/lang/getDictionary';

import { Cross2Icon } from '@radix-ui/react-icons';

import { priorities, statuses } from '../../../types/data/DataRow';

import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    dictionary: TDictionary;
}

export function DataTableToolbar<TData>({ table, dictionary }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className={'flex items-center justify-between'}>
            <div
                className={
                    'flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'
                }
            >
                <Input
                    className={'h-8 w-[150px] lg:w-[250px]'}
                    placeholder={`${dictionary.misc.nouns.filter}...`}
                    value={table.getColumn('title')?.getFilterValue() as string}
                    onChange={(event) =>
                        table.getColumn('title')?.setFilterValue(event.target.value)
                    }
                />
                <div className={'flex gap-x-2'}>
                    {table.getColumn('status') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('status')}
                            options={statuses}
                            title={'Status77'}
                        />
                    )}
                    {table.getColumn('priority') && (
                        <DataTableFacetedFilter
                            column={table.getColumn('priority')}
                            options={priorities}
                            title={'Priority'}
                        />
                    )}
                </div>
                {isFiltered ? (
                    <Button
                        className={'h-8 px-2 lg:px-3'}
                        variant={'ghost'}
                        onClick={() => table.resetColumnFilters()}
                    >
                        Reset
                        <Cross2Icon className={'ml-2 h-4 w-4'} />
                    </Button>
                ) : null}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
