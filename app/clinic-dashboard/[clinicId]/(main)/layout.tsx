"use server";

import { authX } from "@/authX";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import NotFoundComponent from "@/components/General/NotFoundComponent";

import { ClinicProvider } from "@/components/Providers/ClinicProvider";
import { getUserSubscription } from "@/services/subscription/getUserSubscription";
import NoSubscription from "@/components/General/NoSubscription";
import DashboardNavbar from "../../_components/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../../_components/DashboardSidebar/DashboardSidebar";
import { getUserClinicByIdOrSlug } from "@/services/clinics/getUserClinic";
import { authorizeUserClinic } from "@/services/clinics/authClinic";

export default async function ClinicDashboardLayout({ children, params }: { params: { clinicId: string }, children: any }) {
    const session = await authX();
    if (!session?.user?.id) redirect('/');

    const clinic = await getUserClinicByIdOrSlug({
        clinicId: params.clinicId,
    });
    if (!clinic) {
        return NotFoundComponent({
            title: "Clinic not found",
            subTitle: "Please try adding the clinic again or contact technical support."
        });
    }
    const auth = await authorizeUserClinic({
        userId: session.user.id,
        clinic: clinic,
    });
    if (!auth) {
        return notFound();
    }

    const { expired } = await getUserSubscription({
        userId: clinic.userId,
        state: "accepted",
    });
    if (expired) {
        return NoSubscription({})
    }
    
    return (
        <ClinicProvider clinic={JSON.parse(JSON.stringify(clinic))}>
            <DashboardSidebar className="fixed" />
            <div className="flex  h-full ">
                <main className="w-full ml-0 lg:ml-72">
                    <DashboardNavbar />
                    <div className="p-6 w-full h-full">
                        {children}
                    </div>
                </main>
            </div>
        </ClinicProvider>
    )
}
