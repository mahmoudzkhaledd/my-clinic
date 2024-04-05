'use client';
import useUrl from '@/components/Hooks/useUrl';
import { useClinic } from '@/components/Providers/ClinicProvider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import { Copy, Link2, Send } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import { useEmployee } from '../_providers/EmployeeProvider';

export default function ActivitiesCardsRow({ className }: { className?: string; }) {
  const url = useUrl();
  const emp = useEmployee();
  const copyUrl = () => {
    navigator.clipboard.writeText(`${url}/invitation/${emp.id}`);
    toast.success("Invitation link copied to clipboard");
  };
  return (
    <Alert>
      <Send className="h-4 w-4" />
      <AlertTitle className="mb-3">Invitation link</AlertTitle>
      <AlertDescription className="flex items-center justify-between bg-muted rounded p-2">
        {
          url == null ? <Skeleton className="w-full h-[20px] rounded-md" /> :
            <Link target="__blank" href={`${url}/invitation/${emp.id}`} className="underline ">
              {`${url}/invitation/${emp.id}`}
            </Link>
        }

        <Button onClick={copyUrl} size={'sm'} variant={'ghost'}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}
