"use server";
import { authX, signOut } from "@/authX";
import { redirect } from "next/navigation";
import NoSubscription from "../../../../components/General/NoSubscription";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Infinity, Package, Hourglass, CircleDollarSign, Check, Clock10, X, CalendarCheck2, HandCoins, Orbit, CalendarCheck, Package2, GanttChartSquare, Trash2, HeartPulse, CircleUser, Database, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomFormMessage from "@/components/General/CustomFormMessage";
import moment from 'moment';
import CircularProgressbar from "./_components/CircularProgressbar";
import UnsubscripeButton from "./_components/Unsubscripe";
import { Progress } from "@/components/ui/progress";
import { getUserSubscription } from "@/services/subscription/getUserSubscription";
import RenewSubComponent from "./_components/RenewSubComponent";
function isBetween(number: number, first: number, second: number) {
  return number >= first && number < second;
}
function DetailCard({ title, data, icon }: {
  title: string;
  data: string;
  icon: React.ReactNode,
}) {
  return <div className="flex flex-col justify-center gap-4 text-center items-center  border shadow rounded-md py-4 px-4">
    {icon}
    <div>
      <h2 className=" font-bold">{title}</h2>
      <p>{data}</p>
    </div>
  </div>;
}
function StateComponent({ active, refused, title, }: { title: string, active: boolean, refused?: boolean, }) {
  return <div className={cn(
    "w-full p-3 rounded-sm flex justify-between items-center",
    {
      "bg-green-50 dark:bg-muted": (!active && !refused),
      "bg-green-100 dark:bg-muted": active,
      "bg-red-300 dark:bg-muted": refused,
    }
  )}>
    <p className=" font-semibold">{title}</p>
    {
      !refused && ((active) ? <Check /> : <Clock10 />)
    }
    {
      refused && <X />
    }
  </div>
}
export default async function MySubscription() {
  const session = await authX();
  if (!session?.user.id) {
    redirect('/');
  }
  const { subscription, daysToExpire, } = await getUserSubscription({ userId: session.user.id, includePackage: true, state: null });
  console.log(daysToExpire);
  if (subscription == null) {
    return NoSubscription({});
  }

  const clinicsPercentage = Math.floor(subscription.currentClinics * 100 / (subscription.package.maxClinics == 0 ? 1 : subscription.package.maxClinics));


  return (
    <div className="grid grid-cols-1 gap-y-4 lg:gap-4 lg:grid-cols-4">
      <div className=" space-y-5 col-span-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className=" space-y-2">
                <CardTitle className="flex items-center gap-2"><GanttChartSquare />Subscription details</CardTitle>
                <CardDescription>Here are the details of your subscription.</CardDescription>
              </div>
              <UnsubscripeButton state={subscription.state} />
            </div>
            <hr />
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-3  gap-4 ">
           
            <Card>
              <CardHeader className="font-semibold ">
                <div className="flex items-center gap-2">
                  <Infinity /> <p>Clinics limit ({subscription.currentClinics})</p>
                </div>
                <hr className="mt-2" />
              </CardHeader>
              <CardContent>
                <h1 className={cn(
                  " text-xl font-bold text-center mb-3",
                  {
                    "text-green-400": isBetween(clinicsPercentage, 0, 50),
                    "text-green-600": isBetween(clinicsPercentage, 50, 70),
                    "text-red-600": isBetween(clinicsPercentage, 70, 100),
                  }
                )}>{clinicsPercentage}%</h1>
                <Progress value={subscription.currentClinics * 100 / subscription.package.maxClinics} />
              </CardContent>
            </Card>
            <DetailCard
              title="Subscription date"
              icon={<CalendarCheck />}
              data={moment(subscription.renewDate).format('LL')}
            />
            <DetailCard
              title="Renew Date"
              icon={<CalendarCheck2 />}
              data={(subscription.state == "refused" || subscription.renewDate == null) ? "Not specified" : moment(subscription.renewDate).fromNow()}
            />


          </CardContent>
          <div className="px-5">
            {
              subscription.state == 'refused' &&
              <CustomFormMessage type='error' title="Refusal reason">
                {subscription.refusal_reason ?? "Not set"}
              </CustomFormMessage>
            }
          </div>
        </Card>
        <Card>
          <CardHeader >
            <CardTitle className="flex items-center gap-2"><Package2 /> Package Information</CardTitle>
            <CardDescription>The package you're subscriped in.</CardDescription>
            <hr />
          </CardHeader>
          <CardContent className="grid grid-cols-1 grid-rows-2 lg:grid-cols-3  gap-4 ">
            <DetailCard
              title="Package name"
              data={subscription.package.name}
              icon={<Package />}
            />
            <DetailCard
              title="Package price"
              data={`${subscription.package.currency == 'dollar' ? "$" : ""}${subscription.package.price}${subscription.package.currency == 'pound' ? " EGP" : ""}`}
              icon={<CircleDollarSign />}
            />
            <DetailCard
              title="Package duration"
              data={subscription.package.duration}
              icon={<Hourglass />}
            />



            <DetailCard
              title="Maximum clinics"
              data={subscription.package.maxClinics.toString()}
              icon={<HeartPulse />}
            />
            <DetailCard
              title="Maximum employees"
              data={subscription.package.maxEmployees.toString()}
              icon={<CircleUser />}
            />
            <DetailCard
              title="Maximum storage"
              data={`${subscription.package.maxStorage} GB`}
              icon={<Database />}
            />
          </CardContent>
        </Card>

      </div>
      <div className="col-span-1 space-y-5 w-full">
        <div className="h-fit p-4 flex flex-col w-full shadow border rounded-md">
          <h2 className=" text-lg font-semibold">Subscription duration</h2>
          <hr className="mb-4 mt-2" />
          <div className=" space-y-4 gap-4">

            <CircularProgressbar
              className="m-auto col-span-1 text-white"
              progress={daysToExpire != null ? 100 - Math.round((subscription.duration_days - daysToExpire) * 100 / subscription.duration_days) : 0}
              size={130}
              fontSize={17}
              strokeWidth={12}
            />
            <div className=" col-span-1 flex flex-col ">
              {(daysToExpire != null) && <h2 className="my-auto text-xl text-center font-semibold">{daysToExpire} days remaining</h2>}
              {
                (daysToExpire == null) && <h2 className="my-auto text-xl text-center font-semibold">
                  Not approved yet!
                </h2>
              }
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 border shadow rounded-md py-4 px-4">
          <h2 className="text-lg font-bold flex gap-2"><Orbit /> State</h2>
          {
            subscription.state != 'refused' && <>
              <StateComponent title="Pending" active={subscription.state === 'pending' || subscription.state === 'accepted'} />
              <StateComponent title="Accepted" active={subscription.state === 'accepted'} />
            </>
          }
          {
            subscription.state == 'refused' && <StateComponent title="Refused" active={false} refused />
          }
        </div>
        <RenewSubComponent />
      </div>
    </div>
  )
}
