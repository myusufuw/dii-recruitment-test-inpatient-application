import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const menuList = [
    {
      title: 'Daftar Pasien',
      path: '/'
    },
    {
      title: 'Tambah Pasien',
      path: '/add-patient'
    }
  ]

  const path = usePathname()

  return (
    <div className='min-w-[220px] bg-green-500 h-screen p-4 flex flex-col'>
      <Image
        src='/nuha-logo.svg'
        width={150}
        height={20}
        priority={true}
        alt='nuha-logo'
        className='object-cover mb-6 self-center'
      />

      {menuList.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={clsx('mb-2 px-4 py-2 rounded font-medium text-white', {
            'bg-green-400': path === item.path
          })}
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default Sidebar
