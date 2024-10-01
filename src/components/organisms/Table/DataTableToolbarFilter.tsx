import type { Table } from '@tanstack/react-table';
import type { TDictionary } from '@/lang/getDictionary';

import { Cross2Icon } from '@radix-ui/react-icons';

import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FilterOption {
    columnId: string;
    title: string;
    options: { value: string; label: string }[];
}

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    filters: FilterOption[];
    globalFilterColumns: string[];
    dictionary?: TDictionary;
}

export function DataTableToolbarFilter<TData>({
    table,
    filters,
    dictionary,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    const handleGlobalFilterChange = (value: string) => {
        table.setGlobalFilter(value);
    };

    return (
        <div className={'flex items-center justify-between'}>
            <div
                className={
                    'flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'
                }
            >
                <Input
                    className={'h-8 w-[150px] lg:w-[250px]'}
                    placeholder={`${dictionary?.misc.nouns.filter}...`}
                    // FIXME:ARREGLAR TIPADO
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    value={table.getState().globalFilter ?? ''}
                    onChange={(event) => handleGlobalFilterChange(event.target.value)}
                />
                <div className={'flex gap-x-2'}>
                    {filters.map(
                        ({ columnId, title, options }) =>
                            table.getColumn(columnId) && (
                                <DataTableFacetedFilter
                                    key={columnId}
                                    column={table.getColumn(columnId)}
                                    options={options}
                                    title={title}
                                />
                            ),
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
