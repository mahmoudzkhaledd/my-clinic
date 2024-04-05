
import { CreateAuth } from "./authX/AuthX";
import { authConfig } from "./authX.config";


export const {
    authX: authXClinic,
    signIn: signInClinic,
    signOut: signOutClinic,
    useSignOutClient: useSignOutClientClinic,
} = CreateAuth(authConfig, "clinic_token");