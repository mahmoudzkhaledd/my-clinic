'use client';
import { useClinic } from '@/components/Providers/ClinicProvider'
import { Heading } from '@/components/ui/heading'


export default function HeadingClient() {
    const clinic = useClinic();
    return (
        <Heading
            title={`Employees (${clinic.employeesCount})`}
            description="View all your clinic employees."
        />
    )
}
