"use client"
import Logo from "@/components/General/Logo";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/General/ThemeToggle";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarProps } from "@/types/NavbarProps";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { signOut } from "@/authX";

const navbarItems: NavbarProps = {
  items: [
    {
      title: "Patients",
      href: "/patients",
    },
    {
      title: "Appointments",
      href: "/appointments",
    },
    {
      title: "Visits",
      href: "/visits",
    },
  ]
};
export default function DashboardNavbar({ className }: { className?: string }) {
  const [pending, startTrans] = useTransition();

  const signOutServer = () => {
    startTrans(async () => {
      await signOut(`/`);
      // signOutClinic(`/dashboard/clinics`);
    });
  };
  const param = useParams();
  return (
    <div className={cn(
      "px-4 md:px-[50px] max-w-[100%] supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur ",
      className)}>

      <nav className="h-14  flex items-center justify-between ">
        {/* <Logo to="/" /> */}
        <div />
        <div className="items-center gap-2 hidden lg:flex">
          {
            navbarItems.items.map((e, idx) =>
              <Link key={idx} className="" href={`/clinic-dashboard/${param.clinicId}/${e.href}`}>
                <Button variant={'ghost'} size={'sm'}>{e.title}</Button>
              </Link>)
          }
        </div>
        <div className="flex items-center gap-6">
          <Button loading={pending} disabled={pending} className="h-full" variant={'outline'} onClick={signOutServer}>Logout</Button>
          <ThemeToggle />
          <MobileSidebar />
        </div>
      </nav>
    </div>
  );
}
