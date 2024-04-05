"use client"
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { useTransition } from 'react'
import { acceptRefuseInvition } from '../../actions/AcceptInvitation';
import toast from 'react-hot-toast';

export default function AcceptRefuseInvitationBtns({ empId }: { empId: string }) {
    const [loading, startTrans] = useTransition();
    const handleClick = (accept: boolean) => {
        startTrans(async () => {
            const res = await acceptRefuseInvition(empId, accept);
            if (res?.error) {
                toast.error(res.error);
            }
        });
    };
    return (
        <div className='mt-9 flex gap-4 items-center'>
            <Button disabled={loading} onClick={() => handleClick(true)} className='flex items-center gap-1 w-full'><Check className='w-5 h-5' /> Accept</Button>
            <Button disabled={loading} onClick={() => handleClick(false)} className='flex items-center gap-1 w-full' variant={'destructive'}><X className='w-5 h-5' />Refuse</Button>
        </div>
    )
}
