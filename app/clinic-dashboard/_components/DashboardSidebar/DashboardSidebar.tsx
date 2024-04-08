"use client";
import { cn } from "@/lib/utils";
import SidebarSection from "./SidebarSection";
import { type LucideIcon, Home, Stethoscope, Activity, User, CircleDollarSign, ArrowLeftRight, DollarSign, Headset, Wallet, BarChartBig, LayoutDashboard, Settings, Send, Package2Icon, BellIcon } from "lucide-react"
import React from "react";
import { ClinicDashboardSection } from "@/app/dashboard/types/DashboardSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const dashboardSections: ClinicDashboardSection[] = [
    {
        title: "",
        prefix: "/",
        links: [
            {
                title: "Home",
                link: "/",
                icon: Home
            },
            {
                title: "Analysis",
                link: "analysis",
                icon: BarChartBig
            },
        ],
    },
    {
        title: "",
        prefix: "/",
        links: [
            {
                title: "invitations",
                link: "invitations",
                icon: Send,
            },
            {
                title: "employees",
                link: "employees",
                icon: User,
            },

        ],
    },
    {
        title: "",
        prefix: "/",
        links: [

            {
                title: "Transactions history",
                link: "transactions",
                icon: ArrowLeftRight,
            },
        ],
    },
    {
        title: "",
        prefix: "/",
        links: [
            {
                title: "Settings",
                link: "settings",
                icon: Settings,
            },
        ],
    },
    {
        title: "",
        prefix: "/",
        links: [
            {
                title: "Main dashboard",
                link: "../../../dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "Help & Support",
                link: "support",
                icon: Headset,
            },
        ],
    },
];
export default function DashboardSidebar({ sheet, className }: { sheet?: boolean, className?: string; }) {
    //h-[calc(100vh-3.6rem)]
    return (
        <nav className={cn(` pt-6 pb-6 h-screen overflow-y-auto lg:block w-72`, className, {
            "hidden border-r ": !sheet,
            "w-full": sheet,

        })}>
            <div className="space-y-0 ">
                <div className="flex h-[60px] mb-4 items-center border-b px-6">
                    <Link className="flex items-center gap-2 font-semibold" href="#">
                        <Package2Icon className="h-6 w-6" />
                        <span className="">Acme Inc</span>
                    </Link>
                    <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                        <BellIcon className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                {
                    dashboardSections.map((e, idx) =>
                        <SidebarSection
                            divide={false}
                            // divide={idx < dashboardSections.length - 1}
                            key={idx} section={e} />)
                }
            </div>
        </nav>
    );
}
