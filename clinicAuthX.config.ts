import AuthXConfigs from "@/authX/types/AuthXConfigs";
import bcrypt from 'bcryptjs';
import { loginSchema } from "./types/loginSchema";
import { prisma } from '@/lib/db';
import { CredentialsError } from "./authX/types/CredentialsError";
import { DEFAULT_REDIRECT } from "./routes";
import { TokenPayload } from "./authX/types/types";

export const authConfig: AuthXConfigs = {
    redirectAfterAuth: DEFAULT_REDIRECT,
    
    authorize: async (credentials: object) => {
        const model = loginSchema.safeParse(credentials);
        if (!model.success) throw new CredentialsError("Please enter the data correctly!")
        try {
            const tempUser = await prisma?.user.findUnique({
                where: {
                    email: model.data.email,
                },
            });
            if (tempUser?.password == null) throw new CredentialsError("Please check your email or password!")
            const match = await bcrypt.compare(model.data.password, tempUser.password);
            if (!match) throw new CredentialsError("Please check your email or password!")
            return tempUser;
        } catch (ex) {
            throw new CredentialsError((ex as Error)?.message || "");
        }
    },
}