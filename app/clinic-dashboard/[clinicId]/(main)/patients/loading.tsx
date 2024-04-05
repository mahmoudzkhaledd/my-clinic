import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Loading() {
    <Skeleton className="w-full h-[20px] rounded-md" />
    return (
        <div className="flex gap-5 w-full flex-col">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Skeleton className="w-full h-[150px] rounded-md" />
                <Skeleton className="w-full h-[150px] rounded-md" />
                <Skeleton className="w-full h-[150px] rounded-md" />
                <Skeleton className="w-full h-[150px] rounded-md" />
            </div>
            <Skeleton className="w-full h-[400px] rounded-md" />
           
        </div>
    )
}
