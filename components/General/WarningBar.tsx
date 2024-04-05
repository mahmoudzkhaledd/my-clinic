import React from 'react'

export default function WarningBar({ children }: { children?: React.ReactNode }) {
    return (
        <div className='w-full flex items-center justify-center h-8 bg-red-500'>
            {children}
        </div>
    )
}
