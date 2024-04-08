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
            
        </div>
    )
}
