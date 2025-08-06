import z from 'zod'

export const AddNewPatientSchema = z.object({
  name: z.string().min(1, 'Nama tidak boleh kosong'),
  nik: z.string().min(12, 'NIK harus 12 digit'),
  diagnosis: z.string().min(1, 'Diagnosa tidak boleh kosong'),
  date: z.string().min(1, 'Tanggal tidak boleh kosong'),
  doctor: z.string().min(1, 'Dokter tidak boleh kosong'),
  room: z.string().min(1, 'Ruangan tidak boleh kosong')
})

export type AddNewPatientType = z.infer<typeof AddNewPatientSchema>
