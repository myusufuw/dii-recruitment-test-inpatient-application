'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { usePatient } from '@/hooks/use-patient'
import { AddNewPatientSchema, AddNewPatientType } from '@/schemas/patient'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const AddPatient = () => {
  const form = useForm<AddNewPatientType>({
    resolver: zodResolver(AddNewPatientSchema),
    defaultValues: {
      name: '',
      nik: '',
      diagnosis: '',
      date: '',
      doctor: '',
      room: ''
    }
  })

  const { addNewPatient } = usePatient()

  const [loading, setLoading] = useState(false)

  const onSubmit = (data: AddNewPatientType) => {
    setLoading(true)

    setTimeout(() => {
      addNewPatient.mutate(data)
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-4'>Tambah Data Pasien</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 w-full max-w-lg border p-4 shadow rounded-lg'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pasien</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='nik'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIK</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='3310780000000000'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='diagnosis'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diagnosa</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Masukan diagnosa penyakit'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal</FormLabel>
                <FormControl>
                  <Input type='date' placeholder='01/01/2025' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='doctor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Dokter</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='dr. John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='room'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Ruangan</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Melati' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='w-full flex justify-end gap-4'>
            <Link
              href='/'
              className='cursor-pointer w-fit border px-4 flex items-center justify-center rounded-md'
            >
              CANCEL
            </Link>

            <Button
              type='submit'
              className='cursor-pointer w-fit min-w-[100px] flex items-center justify-center'
            >
              {loading ? <Loader className='mr-2 animate-spin' /> : 'SUBMIT'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddPatient
