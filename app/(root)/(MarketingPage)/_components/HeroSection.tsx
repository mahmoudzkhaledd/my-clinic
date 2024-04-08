import Image from "next/image";
import { homePageConstants } from "../_constants/HomePageConstants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authX } from "@/authX";
export default async function HeroSection() {
  const session = await authX();
  const loggedIn = session?.user?.id != null;
  return (
    <div className="w-full flex text-center lg:text-start flex-col-reverse gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex-[2]">
        <h2 className="text-xl  mb-3 lg:text-5xl font-bold">
          Online Store Builder - Create Your Own Store
        </h2>
        <p className=" text-gray-400">
          Elevate your clinic's efficiency with our integrated platform. Experience streamlined operations and enhanced patient care.
        </p>
        <div className="mt-4 space-y-4">
          {
            homePageConstants.hero.map((e, idx) => <div className="flex items-center gap-2" key={idx}>
              <e.icon />
              {e.title}
            </div>)
          }
        </div>
        <div className="mt-7">
          <Link href={loggedIn ? "/dashboard/clinics" : "/"}>
            <Button className="w-[300px]">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div
        className="flex-[3]">
        <Image
          className="ml-auto"
          loading='eager'
          src={'/images/doctors.svg'}
          width={500}
          height={500} alt="Doctors" />
      </div>
      <div className="glow"/>
    </div>
  )
}
