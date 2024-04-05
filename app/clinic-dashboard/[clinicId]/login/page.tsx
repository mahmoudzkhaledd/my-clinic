"use server";
import NotFoundComponent from "@/components/General/NotFoundComponent";
import { prisma } from "@/lib/db"
import LoginForm from "./_components/LoginForm";
export default async function ClinicLoginPage({ params }: { params: { clinicId: string; } }) {
  const clinic = await prisma.clinic.findFirst({
    where: {
      OR: [
        {
          id: params.clinicId,
        },
        {
          slug: params.clinicId,
        },
      ]
    }
  });
  if (clinic == null) {
    return <NotFoundComponent title="Clinic not found!" subTitle="Please check the clinic's Id or contact the technical support." />
  }
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoginForm clinic={JSON.parse(JSON.stringify(clinic))}/>
    </div>
  )
}
