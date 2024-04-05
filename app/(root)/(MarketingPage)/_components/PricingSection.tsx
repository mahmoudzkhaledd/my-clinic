import PricingCard from '@/components/General/PricingCard'
import PricingCardProps from '@/types/PricingCardProps'
import React from 'react'

export default function PricingSection({
  packages,
}: { packages: PricingCardProps[] }) {
  return (
    <section >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Unlock Your Clinic's Potential with Our Exclusive Packages!
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Supercharge your practice with our range of subscription options. From solo practitioners to thriving clinics, find the perfect plan to elevate your success.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 md:gap-6 xl:gap-10 lg:space-y-0">
          {
            packages.map((e, idx) => <PricingCard pkg={e} key={idx} />)
          }
        </div>
      </div>
    </section>

  )
}
