'use client';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navbarItems } from "./NavbarItems";

export default function MenuBtn() {
    const [open, setOpen] = useState(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <Button className="md:hidden flex items-center justify-center" variant={'ghost'} size={'icon'}>
                <SheetTrigger asChild>
                    <MenuIcon className="w-5 h-5"/>
                </SheetTrigger>
            </Button>
            <SheetContent side="left" className="px-4">
                <div className="mt-6  flex flex-col gap-4">
                    {
                        navbarItems.items.map((e, idx) =>
                            <Button key={idx} variant={'ghost'}>

                                <Link  href={e.href}>
                                    {e.title}
                                </Link>
                            </Button>
                        )
                    }
                </div>
            </SheetContent>
        </Sheet>

    )
}
