"use client"
import Logo from "@/components/General/Logo";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/General/ThemeToggle";
import { MobileSidebar } from "./mobile-sidebar";
import { signOut } from "@/authX";
import { useTransition } from "react";


export default function DashboardNavbar({ className }: { className?: string }) {
  const [pending, startTrans] = useTransition();
  const signOutServer = () => {
    startTrans(async () => {
      signOut('/');
    });
  };
  return (
    <div className={cn(
      "px-4 md:px-[50px]  supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur ",
      className)}>

      <nav className="h-14  flex items-center justify-between ">
        <Logo to="/" />
        <div className="flex items-center gap-6">
          <Button disabled={pending} loading={pending} className="h-full" variant={'outline'} onClick={signOutServer}>Logout</Button>
          <ThemeToggle />
          <MobileSidebar />
        </div>
      </nav>
    </div>
  );
}
