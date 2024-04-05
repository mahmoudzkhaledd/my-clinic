"use client"

import { Employee } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import CellAction from "./CellAction";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const employeesColumns: ColumnDef<Employee>[] = [


    {
        header: "Job title",
        accessorKey: "jobTitle",
    },
    {
        header: "Invitation status",
        cell: (props) => {
            const status = props.row.original.status;
            return <Badge className=" rounded-sm " variant={status == null ? 'default' : status ? 'success' : 'destructive'}>
                {status == null ? "Pending" : status ? "Accepted" : "Refused"}
            </Badge>

        }
    },

    {
        header: "Created at",
        accessorKey: "createdAt",
        cell(props) {
            return <>{moment(props.getValue() as Date).fromNow()}</>
        },
    },

    {
        id: "actions",
        cell(props) {
            return <CellAction employee={props.row.original} />
        },
    },

]