import { authX } from "@/authX";
import { redirect } from "next/navigation";
import ClinicComponent from "./_components/ClinicComponent";

export default async function ClinicDashboard({ params }: { params: { clinicId: string; } }) {
  const session = await authX();
  if (!session?.user?.id) redirect('/');


  return (
    <div className=" space-y-4">
      <h2 className="font-bold text-2xl mb-2">👋 Welcome, {session.user.name}</h2>
      <ClinicComponent />
    </div>
  );
}
