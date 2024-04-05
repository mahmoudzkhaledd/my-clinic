"use client"
import { Transaction, Wallet } from '@prisma/client'

import React, { createContext, useContext } from 'react';
type walletType = Wallet & { transactions: Transaction[] };
const walletContext = createContext<walletType>(null);
export const useWallet = () => {
    const wallet = useContext(walletContext);
    return wallet;
}
export default function WalletProvider({ value, children }: { value: walletType, children: React.ReactNode }) {
    return (
        <walletContext.Provider value={value}>{children}</walletContext.Provider>
    )
}
