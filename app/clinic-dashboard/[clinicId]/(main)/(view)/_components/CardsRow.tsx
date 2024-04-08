import React from 'react'
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { CalendarIcon, ClockIcon, UserIcon, UsersIcon } from 'lucide-react'

export default function CardsRow() {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <Button size="sm">View all</Button>
                </CardHeader>
                <CardContent className="flex items-center justify-center flex-col gap-4 p-6">
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-6 w-6" />
                            <div className="flex flex-col leading-none">
                                <span className="font-semibold">Dermatology</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Dr. Smith</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-6 w-6" />
                            <div className="flex flex-col leading-none">
                                <span className="font-semibold">10:00 AM</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Scheduled</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <UserIcon className="h-6 w-6" />
                            <div className="flex flex-col leading-none">
                                <span className="font-semibold">John Doe</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Patient</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <UsersIcon className="h-6 w-6" />
                            <div className="flex flex-col leading-none">
                                <span className="font-semibold">+1 (234) 567 8901</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Contact</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
        </div>
    )
}
