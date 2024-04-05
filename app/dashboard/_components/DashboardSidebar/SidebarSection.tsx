"use client"
import { DashboardSection } from '../../../dashboard/types/DashboardSection'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function SidebarSection({ section, divide }: { divide: boolean, section: DashboardSection }) {
    const path = usePathname();
    const url = path.replaceAll('/dashboard/', "").replaceAll('/', "");



    return (
        <>
            <h2 className="mb-2 text-lg px-4 text-gray-500 tracking-tight">
                {section.title}
            </h2>
            <div className='space-y-2 px-4 mb-2'>
                {
                    section.links.map((e, idx) => {
                        const lnk = `${section.prefix}${e.link}`.replaceAll('/', "");
                        return <Link className='block' key={idx} href={`/dashboard/${section.prefix}${e.link}`}>
                            <Button onClick={e.action} size={'sm'} className={cn(
                                'w-full flex justify-start text-start ',
                                {
                                    "bg-gray-100 dark:text-gray-950 dark:hover:text-white": url == lnk
                                }
                            )} variant={'ghost'}>
                                <p>{e.title}</p>
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
