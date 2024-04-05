"use client";
import { cn } from "@/lib/utils";
import SidebarSection from "./SidebarSection";
import { type LucideIcon, Home, Stethoscope, Activity, User, CircleDollarSign, ArrowLeftRight, DollarSign, Headset, Wallet, BarChartBig, LayoutDashboard, Settings, Send } from "lucide-react"
import React from "react";
import { ClinicDashboardSection } from "@/app/dashboard/types/DashboardSection";

const dashboardSections: ClinicDashboardSection[] = [
    {
        title: "Dashboard",
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
        title: "Staff",
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
        title: "Financial",
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
        title: "Settings",
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
export default function DashboardSidebar({ sheet }: { sheet?: boolean }) {
    return (
        <nav className={cn(`relative pt-6 pb-6 h-[calc(100vh-3.6rem)] overflow-y-auto lg:block w-72`, {
            "hidden border-r ": !sheet,
            "w-full": sheet,
        })}>
            <div className="space-y-4 ">
                {
                    dashboardSections.map((e, idx) =>
                        <SidebarSection divide={idx < dashboardSections.length - 1} key={idx} section={e} />)
                }
            </div>
        </nav>
    );
}
