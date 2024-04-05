
import { cn } from "@/lib/utils";
import SidebarSection from "./SidebarSection";
import { DashboardSection } from "../../../dashboard/types/DashboardSection";


const dashboardSections: DashboardSection[] = [
    {
        title: "Clinics",
        prefix: "/clinics",
        links: [
            {
                title: "My clinics",
                link: "/",
            },
        ],
    },
    {
        title: "Packages",
        prefix: "/packages",
        links: [
            {
                title: "Manage subscription",
                link: "/subscription",
            },
            {
                title: "All Packages",
                link: "/all",
            },
        ],
    },
    {
        title: "Account",
        prefix: "/account",
        links: [
            {
                title: "Manage Account",
                link: "/",
            },
        ],
    },
    {
        title: "Financial",
        prefix: "/",
        links: [
            {
                title: "Wallet",
                link: "/wallet/transactions",
            }
        ],
    },

    {
        title: "",
        prefix: "/",
        links: [
            {
                title: "Help & Support",
                link: "/support",
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
