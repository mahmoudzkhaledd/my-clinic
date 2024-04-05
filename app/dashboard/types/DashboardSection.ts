import { LucideIcon } from "lucide-react";

export interface DashboardSection {
    title: string;
    prefix: string;
    links: {
        title: string;
        link: string;
        action?: () => void;
    }[];
}
export interface ClinicDashboardSection extends DashboardSection {
    links: {
        title: string;
        link: string;
        icon?: LucideIcon,
    }[]
}