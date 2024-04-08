
import { authX } from '@/authX';
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import { prisma } from '@/lib/db';
export default async function EmpLayout({ children, params }: { children: React.ReactNode; params: { clinicId: string; } }) {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    const clinic = await prisma.clinic.findUnique({
        where: {
            id: params.clinicId,
            userId: session.user.id,
        }
    });
    if (clinic == null) return notFound();
    return (
        <>
            {children}
        </>
    )
}
