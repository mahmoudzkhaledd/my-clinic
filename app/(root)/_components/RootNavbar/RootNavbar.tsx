import Logo from "@/components/General/Logo";
import { navbarItems } from "./NavbarItems";
import Link from "next/link";
import LoginRegisterBtns from "./LoginRegisterBtns";
import { cn } from "@/lib/utils";
import MenuBtn from "./MenuBtn";


export default function RootNavbar({ className }: { className?: string }) {
  return (
    <div
      style={{
        backdropFilter: "saturate(180 %) blur(5px)",
        background: "hsla(0, 0 %, 100 %, .8)",
        boxShadow: "inset 0 -1px 0 0 var(--accents-2)",
      }}
      className={
        cn(
          "fixed top-0 left-0 z-10 right-0 px-4 md:px-[50px] lg:px-[100px] supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur ",
          className)
      } >
      <nav className="h-14  flex items-center justify-between ">
        <Logo to="/" className="md:block hidden" />
        <MenuBtn />
        <div className="md:flex hidden items-center gap-6">
          {
            navbarItems.items.map((e, idx) =>
              <Link key={idx} href={e.href}>
                {e.title}
              </Link>)
          }
        </div>
        <LoginRegisterBtns />
      </nav>
    </div >
  );
}
