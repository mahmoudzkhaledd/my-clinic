import React from 'react'
import DashboardNavbar from './_components/DashboardNavbar/DashboardNavbar'
import DashboardSidebar from './_components/DashboardSidebar/DashboardSidebar'
import { SubscriptionProvider, } from '@/components/Providers/SubscriptionProvider'
import { authX } from '@/authX'
import { redirect } from 'next/navigation'
import WarningBar from '@/components/General/WarningBar'
import { getUserSubscription } from "@/services/subscription/getUserSubscription";
import Link from 'next/link'
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await authX();
  if (!session?.user.id) {
    redirect('/');
  }
  const { subscription, daysToExpire } = await getUserSubscription({ userId: session.user.id, state: "accepted" });
  return (
    <SubscriptionProvider subscription={JSON.parse(JSON.stringify({ subscription, daysToExpire }))}>
      {
        (daysToExpire != null && daysToExpire <= 5) && <WarningBar>
          <p className='text-white'>Warning: Your subscription will expire in {daysToExpire} {daysToExpire != 1 ? "days" : "day"}, please check <Link className=' underline' href={'/dashboard/packages/subscription'}> subscription page</Link>.</p>
        </WarningBar>
      }
      <DashboardNavbar />
      <div className="flex   ">
        <DashboardSidebar />
        <main className="w-full p-6 ">
          {children}
        </main>
      </div>
    </SubscriptionProvider >
  )
}
