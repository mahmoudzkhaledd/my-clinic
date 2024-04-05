'use server';
import { prisma } from '@/lib/db';
import { z } from "zod";
import { registerSchema } from "../../../types/registerSchema";
import { redirect } from 'next/navigation';

import bcrypt from 'bcryptjs';
import { customSanatize } from '@/lib/customSantize';

export const register = async (values: z.infer<typeof registerSchema>) => {
    const model = registerSchema.safeParse(values);
    if (!model.success) return {
        error: "Please enter data correctly"
    };
    try {
        values = customSanatize(values);
        const tempUser = await prisma?.user.findFirst({
            where: {
                email: model.data.email,
            },
        });
        if (tempUser != null) return {
            error: "This email is already taken",
        }
        const {
            email,
            password,
            name,
            phone
        } = model.data;
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await prisma?.user.create({
            data: {
                email,
                password: hashedPass,
                name,
                phone: phone,
                wallet: {
                    create: {
                        currency: "pound",
                    }
                }
            },
        });

    } catch (ex) {
        return {
            error: "Something went wrong",
        }
    }
    redirect('/login');
}