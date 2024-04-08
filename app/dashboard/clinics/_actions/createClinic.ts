"use server";
import { authX } from "@/authX";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { clinicSchema } from "../../types/ClinicSchema";
import { customSanatize } from "@/lib/customSantize";
import { getUserSubscription } from "@/services/subscription/getUserSubscription";
interface CreateClinicResponseType {
    error: string;
    seccess?: string;
}
export const createClinic = async (values: any): Promise<CreateClinicResponseType | null> => {
    const session = await authX();
    if (!session?.user?.id) return redirect('/');
    values = customSanatize(values);

    const parse = clinicSchema.safeParse(values);
    if (!parse.success) return {
        error: "Please enter all data required!",
    };
    const model = parse.data;

    model.slug = model.slug.trim().replaceAll(' ', '').replaceAll('/', '');
    try {
        const { subscription, expired, } = await getUserSubscription({ userId: session.user.id, includePackage: true, state: 'accepted' })

        if (!subscription) {
            return {
                error: "You need to have an accepted subscription to create a clinic",
            };
        }
        if (expired) {
            return {
                error: expired,
            };
        }
        if (subscription.currentClinics >= subscription.package.maxClinics) {
            return {
                error: "You've reached the maximum capacity for creating clinics.",
            };
        }
        model.slug = model.slug.trim().replaceAll(' ', '').toLowerCase();
        model.contactEmail = model.contactEmail.trim().replaceAll(' ', '').toLowerCase();

        const [clinic, update] = await prisma.$transaction(async (prsma) => {
            const user = await prsma.user.findUnique({
                where: {
                    id: session.user.id,
                }
            });
            if (!user) {
                return [];
            }
            const createClinic = await prsma.clinic.create({
                data: {
                    ...model,
                    userId: user.id,
                },
            });
            const updateSub = await prsma.subscription.update({
                where: {
                    id: subscription.id,
                    userId: user.id,
                },
                data: {
                    currentClinics: {
                        increment: 1,
                    },
                },
            });

            return [createClinic, updateSub]
        });
        if (clinic)
            redirect(`/clinic-dashboard/${clinic.id}`);
        else return {
            error: "An error has occured, please try again later.",
        }
    } catch (ex) {
        if ((ex as PrismaClientKnownRequestError).code == 'P2002') {
            return {
                error: "Sorry, that clinic name is already in use. Please choose another.",
            }
        }
        if ((ex as Error).message == "NEXT_REDIRECT") {
            throw ex;
        }
        return {
            error: (ex as Error)?.message || "Unknown error",
        };
    }
    return null;
};