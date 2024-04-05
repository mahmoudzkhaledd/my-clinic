"use client"
import { Check, X } from 'lucide-react';
import React from 'react'
import { useAuthX } from '@/authX/Provider/AuthXProvider';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Package, PackageAdvantage } from '@prisma/client';
import Link from 'next/link';

export default function PricingCard({ pkg }: { pkg: Package & { advantages: PackageAdvantage[] } }) {
    const session = useAuthX();

    return (
        <Card
            className={
                pkg.isPopular
                    ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                    : ""
            }
        >
            <CardHeader>
                <CardTitle className="flex item-center justify-between">
                    {pkg.name}
                    {pkg.isPopular ? (
                        <Badge
                            variant="secondary"
                            className="text-sm text-primary"
                        >
                            Most popular
                        </Badge>
                    ) : null}
                </CardTitle>
                <div>
                    <span className="text-3xl font-bold">{pkg.currency == 'dollar' ? "$" : ""}{pkg.price}{pkg.currency == 'pound' ? "EGP" : ""}</span>
                    <span className="text-muted-foreground"> {pkg.duration == 'monthly' ? "/month" : "/year"}</span>
                </div>

                <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>

            <CardContent>
                <Link href={session?.user?.id ? `/dashboard/packages/${pkg.id}` : "/"}>
                    <Button className="w-full">See full details</Button>
                </Link>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
                <div className="space-y-4">
                    {pkg.advantages.map((benefit, idx) => (
                        <span
                            key={idx}
                            className="flex"
                        >
                            {
                                benefit.active ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />
                            }
                            {" "}
                            <h3 className="ml-2">{benefit.text}</h3>
                        </span>
                    ))}
                </div>
            </CardFooter>
        </Card>
    )
    
};