import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
interface SettingsCompProps {
    title: string;
    children: React.ReactNode,
}
export const SettingCompFooter = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="w-full px-3 py-2 border bg-gray-100 dark:bg-muted flex flex-row items-center justify-between">
            {children}
        </div>
    )
};
export const SettingContent = CardContent;

export const SettingComponent = ({ title, children }: SettingsCompProps) => {

    return (
        <Card>
            <CardHeader className="pb-0">
                <h2 className="font-bold text-lg">{title}</h2>
            </CardHeader>
            <hr className="my-4" />
            {children}
            
        </Card>
    )
}
