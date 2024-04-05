'use client'
import { clinicSchema } from '@/app/dashboard/types/ClinicSchema';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from "zod";
import { createClinic } from '../../../../_actions/createClinic';
import { checkNameAvailabilityServer } from '../../../../_actions/checkNameAvailability';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import useUrl from '@/components/Hooks/useUrl';
import { Skeleton } from '@/components/ui/skeleton';
export default function CreateClinicForm() {
    const url = useUrl();
    const [loading, startTrans] = useTransition();
    const [loadingNameChk, startTransNameChk] = useTransition();
    const [checked, setChecked] = useState<boolean>(false);
    const form = useForm<z.infer<typeof clinicSchema>>({
        resolver: zodResolver(clinicSchema),
        defaultValues: {
            name: "",
            slug: "",
            contactEmail: "",
        },
    });
    const checkNameAvailability = () => {
        startTransNameChk(async () => {
            const name = form.getValues('slug');
            if (name.length == 0) {
                toast.error("Kindly ensure the accuracy of the name provided.");
                return;
            }
            const res = await checkNameAvailabilityServer(name);
            if (!res) {
                toast.error("Error occured, please try again later.");
                return;
            }
            if (res.found) {
                toast.error("This name is already in use. Please choose another.");
                return;
            }
            setChecked(true);
        })
    };
    const submitForm = async (values: z.infer<typeof clinicSchema>) => {

        startTrans(async () => {
            const res = await createClinic(values);
            if (res?.error) {
                toast.error(res.error);
                return;
            }
        });
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} className=' space-y-5 flex flex-col'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel> Clinic name </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    {...field}
                                    placeholder='Clinic name' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    url == null ?
                        <Skeleton className='w-full h-[45px]' />
                        : <div className=' space-y-1'>
                            <Label className='font-semibold mb-1'>Clinic URL</Label>
                            <div className='flex gap-3'>
                                <div className='flex border flex-auto rounded-md justify-between'>
                                    <div className='bg-gray-100 dark:bg-muted flex text-center px-3 '>
                                        <p className='m-auto text-sm text-gray-800 dark:text-white'>{url}/</p>
                                    </div>
                                    <div className='p-2 w-full'>
                                        <FormField
                                            control={form.control}
                                            name='slug'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <input
                                                            onChange={(e) => {
                                                                if (checked) {
                                                                    setChecked(false);
                                                                }
                                                                field.onChange(e);
                                                            }}
                                                            disabled={loading}
                                                            className=' outline-none w-full dark:bg-background' placeholder='my-clinic' />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        className={cn('h-full ',
                                            {
                                                "bg-yellow-400 hover:bg-yellow-300 dark:bg-yellow-300": checked,
                                            })}
                                        loading={loadingNameChk} disabled={loadingNameChk || checked} onClick={checkNameAvailability} type='button' >
                                        {
                                            checked ? <Check /> : "Check name"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                }
                <FormField
                    control={form.control}
                    name='contactEmail'
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel> Contact email </FormLabel>
                            <FormControl>
                                <Input
                                    disabled={loading}
                                    {...field}
                                    placeholder='Contact email' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={loading} loading={loading} className='w-full mt-6'>
                    Create
                </Button>
            </form>
        </Form>
    )
}
