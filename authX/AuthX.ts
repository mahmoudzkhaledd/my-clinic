
import { AccountType } from "@/types/AccountTypes";
import { authXAuth } from "./auth/currentUser";
import { signInAuth } from "./auth/signIn";
import signOutAuth from "./auth/signOut";
import { useSignOutClientAuth } from "./auth/signOutClient";
import AuthXConfigs from "./types/AuthXConfigs";
import { TokenPayload } from "./types/types";
import { authConstants } from "./constants/constants";


export function CreateAuth(configs: AuthXConfigs, tokenName?: string) {
    return {
        signIn: (credentials: object, redirectTo: string, accountType: AccountType) => signInAuth({
            credentials,
            redirectTo: redirectTo,
            authorize: configs.authorize,
            tokenName: tokenName,
            accountType,
        }),
        signOut: (redirectTo: string) => signOutAuth(tokenName ?? authConstants.tokenName, redirectTo,),
        useSignOutClient: useSignOutClientAuth,

        authX: async (): Promise<TokenPayload | null> => {
            let res = await authXAuth(tokenName);

            if (!configs.callbacks) return res;
            if (res == null) return null;
            for (const fun of configs.callbacks) {
                res = await fun(res);
                if (res == null) {
                    return null;
                }
            }
            return res;
        },
    };
}

