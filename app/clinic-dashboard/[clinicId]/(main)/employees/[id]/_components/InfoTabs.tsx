"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useEmployee } from '../_providers/EmployeeProvider';

export default function InfoTabs({ className }: { className?: string; }) {
    const emp = useEmployee();

    return (
        <div className={cn('w-full border shadow p-4 rounded-lg h-full', className)}>
            <Tabs defaultValue="roles" >
                <TabsList className='w-full flex items-center'>
                    <TabsTrigger className='w-full' value="roles">Roles</TabsTrigger>
                     <TabsTrigger className='w-full' value="history">History</TabsTrigger>

                </TabsList>
                <TabsContent value="roles" className='py-4 space-y-4'>
                    {
                        (emp.roles.length == 0) && <div className='flex'>
                            <h2 className='  m-auto text-gray-400'>No roles added to this employee!</h2>
                        </div>
                    }
                    {
                        emp.roles.map((e, idx) =>
                            <div key={idx} className='w-full flex gap-4 items-center p-4 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border'>
                                <div className=' rounded-full bg-gray-100 dark:bg-gray-800 justify-center flex text-center w-[30px] h-[30px] '>
                                    <h2 className=' font-bold m-auto'>{idx + 1}</h2>
                                </div>
                                <p>{e.role.name}</p>
                            </div>)
                    }
                </TabsContent>
               
                <TabsContent className='py-4 space-y-4' value="history">View employee logs</TabsContent>

            </Tabs>

        </div>
    )
}
