import type { TDictionary } from '@/lang/getDictionary';
import type { Table } from '@tanstack/react-table';

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    dictionary: TDictionary;
}

export function DataTablePagination<TData>({ table, dictionary }: DataTablePaginationProps<TData>) {
    return (
        <div className={'flex items-center justify-between overflow-auto px-2'}>
            <div className={'hidden flex-1 text-sm text-muted-foreground sm:block'}>
                {table.getFilteredSelectedRowModel().rows.length} {dictionary.tables.pagination.of}{' '}
                {table.getFilteredRowModel().rows.length}{' '}
                {dictionary.tables.pagination.rowsSelected}.
            </div>
            <div className={'flex items-center sm:space-x-6 lg:space-x-8'}>
                <div className={'flex items-center space-x-2'}>
                    <p className={'hidden text-sm font-medium sm:block'}>
                        {dictionary.tables.pagination.rowPerPage}
                    </p>

                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className={'h-8 w-[70px]'}>
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side={'top'}>
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className={'flex w-[100px] items-center justify-center text-sm font-medium'}>
                    {dictionary.tables.pagination.page} {table.getState().pagination.pageIndex + 1}{' '}
                    {dictionary.tables.pagination.of} {table.getPageCount()}
                </div>
                <div className={'flex items-center space-x-2'}>
                    <Button
                        className={'hidden h-8 w-8 p-0 lg:flex'}
                        disabled={!table.getCanPreviousPage()}
                        variant={'outline'}
                        onClick={() => table.setPageIndex(0)}
                    >
                        <span className={'sr-only'}>
                            {dictionary.tables.pagination.goToFirstPage}
                        </span>
                        <DoubleArrowLeftIcon className={'h-4 w-4'} />
                    </Button>
                    <Button
                        className={'h-8 w-8 p-0'}
                        disabled={!table.getCanPreviousPage()}
                        variant={'outline'}
                        onClick={() => table.previousPage()}
                    >
                        <span className={'sr-only'}>
                            {dictionary.tables.pagination.goToPreviousPage}
                        </span>
                        <ChevronLeftIcon className={'h-4 w-4'} />
                    </Button>
                    <Button
                        className={'h-8 w-8 p-0'}
                        disabled={!table.getCanNextPage()}
                        variant={'outline'}
                        onClick={() => table.nextPage()}
                    >
                        <span className={'sr-only'}>
                            {dictionary.tables.pagination.goToNextPage}
                        </span>
                        <ChevronRightIcon className={'h-4 w-4'} />
                    </Button>
                    <Button
                        className={'hidden h-8 w-8 p-0 lg:flex'}
                        disabled={!table.getCanNextPage()}
                        variant={'outline'}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    >
                        <span className={'sr-only'}>
                            {dictionary.tables.pagination.goToLastPage}
                        </span>
                        <DoubleArrowRightIcon className={'h-4 w-4'} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
