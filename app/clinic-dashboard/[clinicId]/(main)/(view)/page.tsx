
import CardsRow from "./_components/CardsRow"
import UpcomingAppointments from "./_components/UpcomingAppointments"

export default function Component() {
    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
            <CardsRow />
            <UpcomingAppointments />


        </main>
    )
}
