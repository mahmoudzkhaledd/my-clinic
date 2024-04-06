import Link from "next/link";

export default function Logo({ to, newPage }: { to?: string, newPage?: boolean }) {
    return (
        <Link
            href={to || "/"}
            className="font-bold text-lg"
            target={newPage ? "_blank" : "_self"}
        >
            CLINIC
        </Link>
    )
}
