"use client";
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {  Employee } from '@prisma/client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Copy, Edit2, Eye, Trash2, View } from 'lucide-react';
import Link from 'next/link';
import React, { useTransition } from 'react'
import toast from 'react-hot-toast';
import { deleteEmployee } from '../_actions/DeleteEmployee';

export default function CellAction({ employee }: { employee: Employee }) {
    const [pending, startTrans] = useTransition();
    const copyId = () => {
        navigator.clipboard.writeText(employee.id);
        toast.success("Employee Id copied to clipboard");
    }
    const deleteDoc = () => {
        if (!window.confirm("Are you sure to delete this employee?")) return;
        startTrans(async () => {
            toast.loading("Deleting employee, please wait");
            const res = await deleteEmployee(employee.id);
            toast.dismiss();
            if (res?.error) { 
                toast.error(res.error);
            }
        })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem disabled={pending} className=' cursor-pointer flex items-center gap-2' onClick={copyId}>
                    <Copy className=' w-4 h-4' /> Copy Id
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={`employees/${employee.id}`}>
                    <DropdownMenuItem disabled={pending} className=' cursor-pointer flex items-center gap-2'>
                        <Eye className=' w-5 h-5' />    View
                    </DropdownMenuItem>
                </Link>
                <Link href={`employees/${employee.id}/edit`}>
                    <DropdownMenuItem disabled={pending} className=' cursor-pointer flex items-center gap-2'>
                        <Edit2 className=' w-5 h-5' />    Edit
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={pending} onClick={deleteDoc} className=' cursor-pointer flex items-center gap-2'>
                    <Trash2 className=' w-5 h-5' />    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
