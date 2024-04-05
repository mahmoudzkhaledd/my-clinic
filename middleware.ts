"use server";
import { NextRequest } from "next/server";
import {
    DEFAULT_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    notAuthorizedRedirect,
    publicRoutes
} from "./routes";

import { authX } from "@/authX";
import { authXClinic } from "./clinicAuth";

function extractIdFromRoute(route: string) {
    const match = route.match(/\/clinic-dashboard\/([^\/]+)(?:\/[^\/]*)?/);
    if (match && match.length > 1) {
        return match[1]; 
    } else {
        return null;
    }
}
function isUrlMatching(url: string, routes: Array<String>) {
    for (const pattern of routes) {
        const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const regex = new RegExp('^' + escapedPattern.replace(/:[^\s/]+/g, '([^/]+)') + '$');
        if (regex.test(url))
            return true;
    }
    return false;
}
async function clinicMiddleware(req: NextRequest) {
    const user = await authXClinic();

    const isLoggedin = user?.user != null;
    const route = req.nextUrl;

    const id = extractIdFromRoute(route.pathname);

    const isAuthRoute = isUrlMatching(route.pathname, [`/clinic-dashboard/:id/login`]);

    if (isAuthRoute) {
        if (isLoggedin) {
            return Response.redirect(new URL(`/clinic-dashboard/${id}`, route));
        }
        return null;
    }
    if (!isLoggedin) {
        return Response.redirect(new URL(`/clinic-dashboard/${id}/login`, route));
    }
    return null;
}
export default async (req: NextRequest) => {
  
    // const match = req.nextUrl.pathname.match(/\/clinic-dashboard\/([^\/]+)(?:\/[^\/]*)?/);
    // if (match)
    //     return await clinicMiddleware(req);

    const user = await authX();
    const isLoggedin = user?.user != null;
    const route = req.nextUrl;
    const isApiRoute = route.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(route.pathname);
    const isAuthRoute = isUrlMatching(route.pathname, authRoutes);
    if (isApiRoute) {
        return null;
    }
    if (isAuthRoute) {
        if (isLoggedin) {
            return Response.redirect(new URL(DEFAULT_REDIRECT, route));
        }
        return null;
    }
    if (!isLoggedin && !isPublicRoute) {
        return Response.redirect(new URL(notAuthorizedRedirect, route));
    }
    return null;
}

export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/",
        "/(api|trpc)(.*)", 
    ],
};