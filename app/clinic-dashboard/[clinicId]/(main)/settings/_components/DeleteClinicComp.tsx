"use client";
import { Button } from "@/components/ui/button";
import { SettingComponent, SettingCompFooter, SettingContent } from "./SettingComponent";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteClinic } from "@/app/clinic-dashboard/actions/deleteClinic";
import { useClinic } from "@/components/Providers/ClinicProvider";

export default function DeleteClinicComp() {
    const [pending, startDel] = useTransition();
    const clinic = useClinic();
    const startDeleteClinic = () => { 
        if(!window.confirm("Are you sure you want to delete this clinic?")) return;
        startDel(async ()=> {
            const res = await deleteClinic(clinic.id);
        })
    };
    return (
        <SettingComponent title="Delete Clinic">
            <SettingContent>
                Deleting the clinic will permanently remove all data and information associated with it. Please ensure you have transferred or copied all important data before proceeding with the deletion. If you are sure you want to delete this clinic, please confirm by clicking the "Delete" button. If you are unsure, you can click "Cancel" to return to the homepage.
            </SettingContent>
            <SettingCompFooter>
                Delete my clinic
                <Button onClick={startDeleteClinic} disabled={pending} loading={pending} variant={'destructive'} className="flex items-center gap-2 p-2" size={'sm'}>
                    <Trash2 className="w-4 h-4" />
                    Delete
                </Button>
            </SettingCompFooter>
        </SettingComponent>
    )
}
