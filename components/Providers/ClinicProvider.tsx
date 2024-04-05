"use client";
import { Clinic } from "@prisma/client";
import React, { useContext } from "react";
import { createContext } from "react";
const ctx = createContext<Clinic>();
export const useClinic = () => { 
    const cont = useContext<Clinic>(ctx);
    return cont;
};
export const ClinicProvider = ({ clinic, children }: { children: React.ReactNode, clinic: Clinic }) => {
    return (
        <ctx.Provider value={clinic}>
            {children}
        </ctx.Provider>
    )
}

