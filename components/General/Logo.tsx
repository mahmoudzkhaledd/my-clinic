import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({ to, newPage, className }: { to?: string, newPage?: boolean, className?: string; }) {
    return (
        <Link
            href={to || "/"}
            className={cn("font-bold text-lg", className)}
            target={newPage ? "_blank" : "_self"}
        >
            CLINIC
        </Link>
    )
}
