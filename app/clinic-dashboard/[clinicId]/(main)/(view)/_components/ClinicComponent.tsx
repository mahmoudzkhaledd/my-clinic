"use client";
import { useClinic } from "@/components/Providers/ClinicProvider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy, Link2, Terminal } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton"
import useUrl from "@/components/Hooks/useUrl";

export default function ClinicComponent() {
    const url = useUrl();
    const clinic = useClinic();

    const copyUrl = () => {
        navigator.clipboard.writeText(url ?? "");
        toast.success("Login url copied to clipboard");
    };
    return (
        <div>
            <Card className="mb-4">
                <CardHeader className=" pb-1 font-bold">
                    <p className="mb-2">{clinic.name}</p>
                </CardHeader>
                <hr />
                <CardContent className="p-5">
                    {
                        JSON.stringify(clinic, null, 4)
                    }
                </CardContent>
            </Card>
            <Alert>
                <Link2 className="h-4 w-4" />
                <AlertTitle className="mb-3">Login url</AlertTitle>
                <AlertDescription className="flex items-center justify-between bg-muted rounded p-2">
                    {
                        url == null ? <Skeleton className="w-full h-[20px] rounded-md" /> :
                            <Link target="__blank" href={`${window.location.origin}/clinic-dashboard/${clinic.slug}/login`} className="underline ">
                                {`${window.location.origin}/clinic-dashboard/${clinic.slug}/login`}
                            </Link>
                    }

                    <Button onClick={copyUrl} size={'sm'} variant={'ghost'}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </AlertDescription>
            </Alert>
        </div>
    )
}
