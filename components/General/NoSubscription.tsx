import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NoSubscription({ message }: { message?: string; }) {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="m-auto text-center flex flex-col justify-center items-center">
                <Image
                    className="mb-6"
                    src={'/images/subscripe-not-found.svg'}
                    width={400}
                    height={400}
                    alt="image" />
                <p className="mb-6 text-gray-500 text-center">
                    {
                        message ?? "You are currently not subscribed to any package. Please visit the packages page to view all the details."
                    }
                </p>
                <Link href={'/dashboard/packages/all'}>
                    <Button>
                        Packages page
                    </Button>
                </Link>
            </div>
        </div>
    )
}
