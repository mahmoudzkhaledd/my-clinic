
import Image from 'next/image';
import CreateClinicForm from './_components/CreateClinicForm';

export default  function CreateClinicPage() {
  
  return (
    <div className='h-full '>
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-10 h-full'>
        <CreateClinicForm />
        <div className='flex-col hidden lg:flex items-center justify-center p-4 rounded border bg-gray-50 dark:bg-transparent h-full'>
          <Image
            className=' mb-7'
            width={300} height={300} src={'/images/create-clinic.svg'} alt='image' />
          <div className='text-center max-w-[700px] '>
            <h2 className=' text-xl font-bold mb-1'>Create your clinic</h2>
            <p className=' text-sm text-gray-400'>Here, you're just a few steps away from bringing your vision for a thriving clinic to life. Whether you're a seasoned healthcare professional or a passionate entrepreneur embarking on a new journey in the medical field, we're here to support you every step of the way.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
