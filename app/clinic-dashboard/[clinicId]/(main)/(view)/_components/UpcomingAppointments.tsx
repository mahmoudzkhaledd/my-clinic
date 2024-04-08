import React from 'react'
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"
import { CalendarIcon, ChevronRight } from 'lucide-react'
import Link from 'next/link'

function AppointmentComponents() {
    return (
        <Link href={''} className="flex items-center gap-2 p-3 px-4 rounded-md bg-gray-100 dark:bg-gray-800/40 dark:hover:bg-gray-800 transition-all">
            <CalendarIcon className="w-4 h-4" />
            <div className="font-medium">10:00 AM</div>
            <div className="flex-1">Consultation with Dr. Smith</div>
            <ChevronRight  className='w-5 h-5'/>
        </Link>
    )
}
export default function UpcomingAppointments() {
    return (
        <div>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your schedule for the day. Please be on time.</CardDescription>
                </CardHeader>
                <CardContent className="p-2">
                    <div className="grid gap-2 text-sm">
                        <AppointmentComponents />

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
