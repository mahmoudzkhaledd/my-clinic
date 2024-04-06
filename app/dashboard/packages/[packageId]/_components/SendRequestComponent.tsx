"use client";
import { Button } from '@/components/ui/button'
import { useEffect, useState, useTransition } from 'react';

import { subscripeInPackage } from '../../_actions/SendPackageRequest';
import toast from 'react-hot-toast';
import { Check } from 'lucide-react';

export default function SendRequestButton({ packageId, subscripedPackageId, className }:
    { packageId: string, subscripedPackageId?: string, className?: string; }) {
    const dis = (subscripedPackageId == packageId);
    const [loading, startTrans] = useTransition();
    
    const handleSubmit = () => {
        if (packageId != subscripedPackageId && !window.confirm("Are you sure to subscribe to this package?")) return;
        startTrans(async () => {
            const res = await subscripeInPackage(packageId);
            if (res?.error) {
                toast.error(res.error);
            }
        })
    };

    return (
        <Button className='flex items-center gap-2 w-full md:w-fit'
            variant={'success'} size={'sm'}
            disabled={loading || dis} 
            loading={loading}
            onClick={handleSubmit}>
            <Check className='w-5 h-5' />
            {
                dis ? "Subscribed" : "Subscribe now"
            }

        </Button>
    )
}
