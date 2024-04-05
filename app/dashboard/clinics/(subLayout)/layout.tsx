"use server";
import { authX } from "@/authX";
import { redirect } from 'next/navigation';
import NoSubscription from '../../../../components/General/NoSubscription';
import { getUserSubscription } from '@/lib/helper';

export default async function ClinicsLayout({ children, }: { children: any }) {
    const session = await authX();
    if (!session?.user?.id) redirect('/');

    const { subscription, expired } = await getUserSubscription({ userId: session.user.id, state: null });
    if (!subscription || expired != null) {
        return NoSubscription({
            message: expired!,
        });
    }

    return children;
}
