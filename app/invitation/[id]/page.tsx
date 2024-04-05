"use server";
import React from 'react'
import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Plus, X } from 'lucide-react';
import { authX } from '@/authX';
import { notFound, redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import AcceptRefuseInvitationBtns from './_components/AcceptRefuseInvitationBtns';
export default async function page({ params }: { params: { id: string } }) {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    const empInv = await prisma.employee.findUnique({
        where: {
            id: params.id,
        },
        include: {
            doctor: true,
            clinic: true,
        },
    });
    if (empInv == null) return notFound();

    if (empInv.doctorId == session.user.id)
        return <div className='w-screen h-screen flex flex-col items-center justify-center'>
            <div className='p-7 rounded-md border'>
                <h2 className='font-bold mx-auto text-center mb-3'>Invitation Error</h2>
                <hr  className='mb-6'/>
                Your account {session.user.email} is already part of the team. Please, log in into your account.
            </div>
        </div>;
    const user = await prisma.employee.findFirst({
        where: {
            userId: session.user.id,
            clinicId: empInv.clinicId,
        },
    });
    if (user != null) return <div className='w-screen h-screen flex flex-col items-center justify-center'>
        Your account {session.user.email} is already part of the team. Please, log in into your account.
    </div>;

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center'>
            <Card>
                <CardHeader className='pb-4 font-bold text-lg'>Invitation</CardHeader>
                <hr className='mb-5' />
                <CardContent>
                    {
                        empInv.status == null ? <>
                            <div className='flex items-center mx-auto w-fit gap-6 mb-5'>
                                <div className='rounded-full bg-muted w-[60px] text-2xl font-extrabold text-center aspect-square flex items-center justify-center'>
                                    {empInv.clinic.name[0]}
                                </div>
                                <Plus />
                                <div className='rounded-full bg-muted w-[60px] text-2xl font-extrabold text-center aspect-square flex items-center justify-center'>
                                    {session.user.name[0]}
                                </div>
                            </div>
                            <span className='font-bold'>{empInv.doctor.name}</span> invited you to his clinic <Badge className='rounded-sm'>{empInv.clinic.name}</Badge>
                            <AcceptRefuseInvitationBtns empId={empInv.id} />
                        </> : <div>
                            <p className='font-semibold text-md'>Sorry, This invitation has already been used!</p>
                        </div>
                    }

                </CardContent>

            </Card>
        </div>
    )
}
