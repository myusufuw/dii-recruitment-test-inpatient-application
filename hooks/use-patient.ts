import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from './use-local-storage'
import { toast } from 'sonner'
import { AddNewPatientType } from '@/schemas/patient'
import { useRouter } from 'next/navigation'
import { patientListDummy } from '@/lib/dummy'

export function usePatient() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const [patientList, setPatientlist] = useLocalStorage('dii-inpatient-app', [])

  const patientListQuery = useQuery({
    queryKey: ['dii-inpatient-app-product-list'],
    queryFn: () => patientList,
    initialData: patientList
  })

  const addNewPatient = useMutation({
    mutationFn: async (patient: AddNewPatientType) => {
      setPatientlist((prev: AddNewPatientType[]) => [patient, ...prev])

      return patientList
    },
    onSuccess: () => {
      queryClient.setQueryData(['dii-inpatient-app-product-list'], patientList)
      toast.success('Berhasil menambahkan data pasien')
      router.push('/')
    },
    onError: () => {
      toast.error('Gagal menambahkan data pasien')
    }
  })

  const seedingPatient = useMutation({
    mutationFn: async () => {
      setPatientlist(patientListDummy)

      return patientList
    },
    onSuccess: () => {
      queryClient.setQueryData(['dii-inpatient-app-product-list'], patientList)
      toast.success('Berhasil melakukan seeding data pasien')
      router.push('/')
    },
    onError: () => {
      toast.error('Gagal melakukan seeding data pasien')
    }
  })

  return {
    patientList: patientListQuery.data || [],
    addNewPatient,
    seedingPatient
  }
}
