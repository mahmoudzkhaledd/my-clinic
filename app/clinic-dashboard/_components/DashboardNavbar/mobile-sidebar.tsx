"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <Button variant={'ghost'} size={'icon'}>
          <SheetTrigger asChild>
            <MenuIcon />
          </SheetTrigger>
        </Button>
        <SheetContent side="left" className="!px-0">
          <DashboardSidebar sheet />
        </SheetContent>
      </Sheet>
    </div>
  );
}
