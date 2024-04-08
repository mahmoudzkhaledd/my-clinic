"use client";
import { ClinicDashboardSection, DashboardSection } from '../../../dashboard/types/DashboardSection'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useParams, usePathname, } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthX } from '@/authX/Provider/AuthXProvider';
import { useClinic } from '@/components/Providers/ClinicProvider';

export default function SidebarSection({ section, divide }: { divide: boolean, section: ClinicDashboardSection }) {
    const param = useParams();
    const url = usePathname();
    const user = useAuthX();
    const clinic = useClinic();
    return (
        <>
            <h2 className="mb-2 text-lg px-4 text-gray-500 tracking-tight">
                {section.title}
            </h2>
            <div className='space-y-1 px-4 mb-2'>
                {
                    section.links.map((e, idx) => {
                        const pattern = new RegExp(`/clinic-dashboard/\\w+/${e.link}`);
                        if (e.validation == true && user?.user.id != clinic.userId) {
                            return;
                        }
                        return <Link className='block group' key={idx} href={`/clinic-dashboard/${param.clinicId}/${e.link}`}>
                            <Button size={'sm'} className={cn(
                                'w-full flex items-center  gap-2 justify-start text-start',
                                {
                                    "bg-gray-100 dark:text-gray-950  dark:hover:text-white":
                                        pattern.test(url) || (url == `/clinic-dashboard/${param.clinicId}` && e.link == '/')
                                }
                            )} variant={'ghost'}>
                                {e.icon && <e.icon className='w-4 h-4' />}
                                <p className=' capitalize'>{e.title}</p>
                            </Button>
                        </Link>;
                    })
                }
            </div>
            {
                divide && <hr />
            }
        </>
    )
}
