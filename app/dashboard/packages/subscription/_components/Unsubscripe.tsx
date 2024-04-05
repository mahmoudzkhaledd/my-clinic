'use client';

import { Button } from "@/components/ui/button";
import { SubscriptionState } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { unsubscripeFromPackage } from "../../_actions/UnsubscripeFromPackage";
import toast from "react-hot-toast";

export default function UnsubscripeButton({ state }: {
    state: SubscriptionState
}) {
    const [pending, startTrans] = useTransition();

    const unscbscripe = async () => {
        if (!window.confirm("Are you sure you want to unsubscribe from this package?")) return;
        startTrans(async () => {
            const res = await unsubscripeFromPackage();
            if (res?.error) {
                toast.error(res.error);
            }
        });
    }
    return (
        <Button onClick={unscbscripe} disabled={pending} loading={pending}
            className="bg-red-500 dark:hover:bg-red-400 px-3 py-2">
            <Trash2 className="w-5 h-5 text-white" size={22} />
        </Button>
    )
}
