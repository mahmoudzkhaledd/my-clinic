"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

import moment from "moment";
import Image from "next/image";
import { useEmployee } from "../_providers/EmployeeProvider";
import { Button } from "@/components/ui/button";
import { Ban, Check, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { deleteEmployee } from "../../_actions/DeleteEmployee";
import toast from "react-hot-toast";
import { banEmployee } from "../../_actions/BanEmployee";
import { useRouter } from "next/navigation";

export default function AccountInformation() {
    const router = useRouter();
    const emp = useEmployee();
    const [pending, startTrans] = useTransition();
    const [banning, startBan] = useTransition();
    const deleteRec = () => {
        if (!window.confirm("Are you sure to delete this employee?")) return;
        startTrans(async () => {
            const res = await deleteEmployee(emp.id);
            if (res?.error) {
                toast.error(res.error);
            }
        });
    };
    const banRec = () => {
        if (!window.confirm(`Are you sure to ${emp.banned ? "unban" : "ban"} this employee?`)) return;
        startBan(async () => {
            const res = await banEmployee(emp.id);
            if (res?.error) {
                toast.error(res.error);
                return;
            }
            router.refresh();
        });
    };
    return (
        <Card className=" overflow-hidden">
            <CardHeader className="p-4 m-0 grid grid-cols-2 ">
                <div className=" space-y-3">
                    <h2 className=" font-semibold my-auto">Account information</h2>
                    <div className=" flex items-center gap-4">
                        <Link href={`${emp.id}/edit`}>
                            <Button  size={'icon'} variant={'outline'}> <Edit className="w-5 h-5" /></Button>
                        </Link>
                        <Button title="Delete employee" disabled={pending || banning} loading={pending} onClick={deleteRec} size={'icon'} variant={'destructive'}> <Trash2 className="w-5 h-5" /></Button>
                        <Button title="Ban/Active account" disabled={pending || banning} loading={banning} onClick={banRec} size={'icon'} variant={emp.banned ? "success" : 'destructive'}>
                            {
                                emp.banned ? <Check className="w-5 h-5" /> : <Ban className="w-5 h-5" />
                            }
                        </Button>
                    </div>
                </div>
                <div className="ml-auto dark:bg-gray-50 rounded-full overflow-hidden w-[50px] aspect-square p-2 bg-gray-900">
                    <Image className=" dark:invert-0 invert rounded-full" src={`/images/doctor-icon.png`} width={100} height={100} alt="" />
                </div>
            </CardHeader>
            <hr className="w-full1" />
            <CardContent className="p-0 py-1">
                <Table>
                    <TableBody>

                        <TableRow>
                            <TableCell className=" font-semibold">Created at</TableCell>
                            <TableCell className=" text-gray-400">{moment(emp.createdAt).fromNow()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=" font-semibold">Last update</TableCell>
                            <TableCell className=" text-gray-400">{moment(emp.updatedAt).fromNow()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className=" font-semibold">Account state</TableCell>
                            <TableCell className=" text-gray-400">
                                {
                                    emp.banned ? "Banned" : "Active"
                                }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
