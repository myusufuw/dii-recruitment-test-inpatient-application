'use client'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { usePatient } from '@/hooks/use-patient'
import { AddNewPatientType } from '@/schemas/patient'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'

const columns: ColumnDef<AddNewPatientType>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <p className='mr-2'>Nama</p>
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      )
    }
  },
  {
    accessorKey: 'nik',
    header: 'NIK'
  },
  {
    accessorKey: 'diagnosis',
    header: 'Diagnosa'
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <p className='mr-2'>Tanggal</p>
          {column.getIsSorted() === 'asc' ? (
            <ArrowUp />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDown />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      )
    },
    cell: ({ row }) => moment(row.original.date).format('DD MMMM YYYY')
  },
  {
    accessorKey: 'doctor',
    header: 'Dokter'
  },
  {
    accessorKey: 'room',
    header: 'Ruangan'
  }
]

export default function Home() {
  const { patientList } = usePatient()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  console.log(patientList)
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-4'>Data Pasien Rawat Inap</h1>

      <DataTable columns={columns} data={patientList} loading={loading} />
    </div>
  )
}
