'use client'

import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Loader } from 'lucide-react'
import { Input } from './ui/input'
import { useState } from 'react'
import { Button } from './ui/button'
import { usePatient } from '@/hooks/use-patient'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const { seedingPatient } = usePatient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
    const name = row.original.name?.toLowerCase() ?? ''
    const nik = row.original.nik?.toLowerCase() ?? ''
    const search = filterValue.toLowerCase()

    return name.includes(search) || nik.includes(search)
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: globalFilterFn,
    state: {
      globalFilter,
      pagination
    },
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination
  })

  return (
    <div className='overflow-hidden rounded-md border relative min-h-[540px]'>
      <div className='flex justify-between items-center m-4'>
        <Input
          placeholder='Search by name or nik...'
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className='max-w-[300px]'
        />

        <Button onClick={() => seedingPatient.mutate()}>Seeding Data</Button>
      </div>

      {loading ? (
        <Loader
          className='animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          size={32}
        />
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='border-r border-t'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='border'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-[400px] text-center'
                >
                  <p className='text-lg font-semibold'>
                    Tidak ditemukan data pasien.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      <div className='flex items-center justify-end space-x-2 py-4 absolute bottom-0 right-5'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
