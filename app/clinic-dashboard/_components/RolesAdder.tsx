import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Role } from '@prisma/client'

import React from 'react'
import { UseFormReturn } from 'react-hook-form'

export default function RolesAdder({ form, roles  }: { roles: Role[], form: UseFormReturn<any> }) {
    
    return <div className="h-fit border rounded-md p-4 shadow">
        <h2 className="font-semibold mb-4">Roles</h2>
        <FormField
            control={form.control}
            name="roles"
            render={() => (
                <FormItem className=' space-y-4'>
                    {roles.map((item) => (
                        <FormField
                            key={item.id}
                            control={form.control}
                            name="roles"
                            render={({ field }) => {
                                const random = `${Math.random() * Math.random()}`;
                            
                                
                                return (
                                    <FormItem
                                        key={item.id}
                                        className="flex border p-3 rounded-md flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                            <Checkbox
                                                id={random}
                                                checked={field.value?.includes(item.id)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                        ? field.onChange([...field.value, item.id])
                                                        : field.onChange(
                                                            (field.value as Array<number>)?.filter(
                                                                (value) => value != item.id
                                                            )
                                                        )
                                                }}
                                            />
                                        </FormControl>
                                        <FormLabel htmlFor={random} className="text-sm h-full w-full font-normal">
                                            {item.name}
                                        </FormLabel>
                                    </FormItem>
                                )
                            }}
                        />
                    ))}
                    <FormMessage />
                </FormItem>
            )}
        />
    </div>
}
