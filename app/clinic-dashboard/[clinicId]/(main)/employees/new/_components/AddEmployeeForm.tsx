"use client"

import { addEmployeeSchema } from "@/app/clinic-dashboard/types/AddEmployeeSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form"
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw, Save } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { toNumber } from "@/lib/utils";
import { addNewEmployee } from "../../_actions/AddNewEmployee";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { Role } from "@prisma/client";
import crypto from 'crypto';
import RolesAdder from "@/app/clinic-dashboard/_components/RolesAdder";
import { editEmployee } from "../../_actions/EditEmployee";


export default function AddEmployeeForm({ roles, initialData }: { roles: Role[], initialData?: z.infer<typeof addEmployeeSchema> & { id: string } }) {
    const params = useParams();

    const [loading, startTrans] = useTransition();


    const form = useForm<z.infer<typeof addEmployeeSchema>>({
        resolver: zodResolver(addEmployeeSchema),
        defaultValues: initialData ?? {
            ssn: "",
            jobTitle: "",
            fees: 0,
            roles: [],
        },
    });
    const submitForm = (values: z.infer<typeof addEmployeeSchema>) => {

        startTrans(async () => {
            if (initialData) {
                const res = await editEmployee(initialData.id, values);
                if (res?.error) {
                    toast.error(res.error);
                }
            } else {
                const res = await addNewEmployee(values, (params.clinicId ?? "") as string);
                if (res?.error) {
                    toast.error(res.error);
                }
            }
        })
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} >
                <div className="flex justify-between mb-7 items-center">
                    <Heading
                        title={initialData ? "Edit employee" : "Add new employee"}
                        description=""
                    />
                    <Button disabled={loading} type="submit" loading={loading} size={'sm'} className="flex items-center gap-2">
                        {
                            !initialData ? <><Plus className="h-5 w-5" /> Add</> : <><Save className="h-5 w-5" /> Edit</>
                        }
                    </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className=" rounded-md border p-5 shadow space-y-3">
                        
                        
                        
                        <FormField
                            control={form.control}
                            name='jobTitle'
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel> Job title </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            {...field}
                                            placeholder='Job title' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        
                        <FormField
                            control={form.control}
                            name='fees'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel> Fees </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                {...field}
                                                onChange={(e) => field.onChange(toNumber(e.target.value) ?? 0)}
                                                placeholder='Fees' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name='ssn'
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel> National Number </FormLabel>
                                    <FormControl>

                                        <Input
                                            disabled={loading}
                                            {...field}
                                            placeholder='National Number' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <RolesAdder roles={roles} form={form} />
                </div>
            </form>

        </Form>
    )
}
