"use client";
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { useEmployee } from '../_providers/EmployeeProvider';

export default function PersonalInformation() {
    const emp = useEmployee();
    return (
        <Card >
            <CardHeader className='font-semibold pb-0'>
                Personal information

            </CardHeader>
            <hr className='mt-5' />
            <CardContent className='p-2'>
                <Table>
                    <TableBody >
                        {
                            emp.user != null && <>
                                <TableRow >
                                    <TableCell className=" font-semibold">Name</TableCell>
                                    <TableCell className=" text-gray-400">{emp.user.name}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell className=" font-semibold">Email</TableCell>
                                    <TableCell className=" text-gray-400">{emp.user.email}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell className=" font-semibold">Phone</TableCell>
                                    <TableCell className=" text-gray-400">{emp.user.phone}</TableCell>
                                </TableRow>

                            </>
                        }
                        <TableRow >
                            <TableCell className=" font-semibold">Invitation Status</TableCell>
                            <TableCell className=" text-gray-400">{emp.status == null ? "Pending" : emp.status ? "Accepted" : "Refused"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=" font-semibold">Job title</TableCell>
                            <TableCell className=" text-gray-400">{emp.jobTitle}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=" font-semibold">National Id</TableCell>
                            <TableCell className=" text-gray-400">{emp.ssn}</TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell className=" font-semibold">Fees</TableCell>
                            <TableCell className=" text-gray-400">{emp.fees} EGP</TableCell>
                        </TableRow>


                    </TableBody>

                </Table>
            </CardContent>
        </Card>
    )
}
