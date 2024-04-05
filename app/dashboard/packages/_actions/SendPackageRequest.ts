"use server";
import { authX } from "@/authX";
import { customSanatize } from "@/lib/customSantize";
import { prisma } from "@/lib/db";
import { PaytabsError } from "@/services/paytabs/PaytabsErrorType";
import { paytabsResponseCodes } from "@/services/paytabs/PaytabsResponseCodes";
import { sendPaymentRequestForSubscription } from "@/services/paytabs/paytabs";
import { redirect } from "next/navigation";
interface SubscripeType {
    error: string;
    seccess?: string;
}
export const subscripeInPackage = async (packageId: string): Promise<SubscripeType | null> => {
    packageId = customSanatize(packageId);
    const session = await authX();
    if (!session?.user?.id) return redirect('/');
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        include: {
            subscription: true,
            wallet: true,
        },
    });
    if (user == null) return redirect('/');
    if (user.subscription?.packageId == packageId) {
        return {
            error: "You're currently subscribed on this package!",
        };
    }
    const pkg = await prisma.package.findUnique({
        where: {
            id: packageId,
        },
    });
    if (!pkg) {
        return {
            error: "Package not found!",
        };
    }
    try {
        const total = pkg.afterDiscount ?? pkg.price;
        const wallet = user.wallet!;
        if (wallet.balance.toNumber() < total) {
            return {
                error: "You don't have enough balance, please recharge your wallet and try again."
            }
        };


        const [sub, update, walet, perch] = await prisma.$transaction(async (prsma) => {
            const clinicsCount = await prsma.clinic.count({
                where: {
                    userId: session.user.id,
                }
            })
            const createSub = await prsma.subscription.create({
                data: {
                    userId: session.user.id,
                    packageId: pkg.id,
                    currentClinics: clinicsCount,
                    renewDate: new Date(),
                    state: 'accepted',
                    duration_days: pkg.duration == 'monthly' ? 30 : 365,
                },
            });

            const updatePackage = await prsma.package.update({
                where: {
                    id: pkg.id,
                },
                data: {
                    usersCount: {
                        increment: 1,
                    },
                },
            });
            const decWallet = await prsma.wallet.update({
                where: {
                    id: wallet.id,
                },
                data: {
                    balance: {
                        increment: - 1 * total,
                    },
                    totalSpent: {
                        increment: total,
                    }
                },
            });
            const createPerch = await prsma.purchases.create({
                data: {
                    userId: user.id,
                    walletId: wallet.id,
                    type: "subscribe",
                    packageId: pkg.id,
                    amount: total,
                },
            });
            return [createSub, updatePackage, decWallet, createPerch];
        });
        redirect('/dashboard/packages/subscription');
    } catch (ex) {
        if ((ex as Error).message == 'NEXT_REDIRECT') throw ex;
    }
    return null;
};