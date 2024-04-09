"use client";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

import { CalendarIcon, ClockIcon, Link2, UserIcon, UsersIcon } from 'lucide-react'
import { BarsChart } from './Chart'
import { useClinic } from "@/components/Providers/ClinicProvider";
import moment from "moment";

export default function CardsRow() {
    const clinic = useClinic();
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <BarsChart />
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle>Your clinic</CardTitle>
                </CardHeader>
                <hr />
                <CardContent className="flex items-center  justify-center flex-col gap-4 p-6">
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-6 w-6" />
                            <div className="flex flex-col leading-none">
                                <span className="font-semibold">Name</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {clinic.name}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-6 w-6" />
                            <div className="flex flex-col leading-none">
                                <span className="font-semibold">Created At</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {moment(clinic.createdAt).fromNow()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <UserIcon className="h-6 w-6" />
                            <div className="flex flex-col leading-none">
                                <span className="font-semibold">Contact Email</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {clinic.contactEmail}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <UsersIcon className="h-6 w-6" />
                            <div className="flex flex-col leading-none">
                            <span className="font-semibold">Employees</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {clinic.employeesCount} Employee(s)
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <Link2 className="h-6 w-6" />
                            <div className="flex flex-col leading-none">
                                <span className="font-semibold">Slug</span>
                                <span className=" truncate text-ellipsis text-nowrap text-gray-500 dark:text-gray-400">
                                    {clinic.slug} 
                                </span>
                            </div>
                        </div>
                        
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
