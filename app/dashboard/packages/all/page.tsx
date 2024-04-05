"use server";
import PricingCard from "@/components/General/PricingCard";
import { prisma } from "@/lib/db";
import Image from "next/image";
export default async function AllPackagesPage() {
  const packages = await prisma.package.findMany({
    include: {
      advantages: true,
    }
  });

  if (packages.length == 0) {
    return <div className="h-full w-full flex flex-col">
      <div className="m-auto">
        <Image src={'/images/not-found.svg'} width={400} height={400} alt="image" />
        <p className="mt-4 text-center">
          The team hasn't added any packages yet. Please check back later.
        </p>
      </div>
    </div>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {
        packages.map((e, idx) => <PricingCard pkg={e} key={idx} />)
      }
    </div>
  )
}
