"use client";

import { useAuthX } from "@/authX/Provider/AuthXProvider";
import { ThemeToggle } from "@/components/General/ThemeToggle";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LoginRegisterBtns() {
    const session = useAuthX();

    return (
        <div className={cn("flex items-center gap-4",{
            "flex-row-reverse": session,
        })}>
            {session ? <Link href={'/dashboard/clinics'}>
                <Button className="h-full">Dashboard</Button>
            </Link>
                : <div className="flex gap-3 items-center">
                    <Link href={'/register'}>
                        <Button className="h-full" variant={'ghost'}>
                            Create Account
                        </Button>
                    </Link>
                    <Link href={'/login'}>
                        <Button className="h-full">
                            Login
                        </Button>
                    </Link>

                </div>}
            <ThemeToggle />
        </div>
    )
}
