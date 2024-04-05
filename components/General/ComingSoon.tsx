import Image from 'next/image'
import React from 'react'

export default function ComingSoon() {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='max-w-[500px] flex flex-col items-center justify-center text-center border shadow p-[50px] rounded-lg '>
                <Image src={'/images/coming-soon.png'} className='mb-5' width={180} height={180} alt='coming soon' />
                <h2 className=' text-3xl mb-2 font-bold'>Coming soon</h2>
                <p className=' text-md  text-gray-400'>
                    Stay tuned for updates on when this feature will be available. Keep an eye out for any announcements.
                </p>
            </div>
        </div>
    )
}
