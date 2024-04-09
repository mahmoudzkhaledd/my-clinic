
import CardsRow from "./_components/CardsRow"
import Greetings from "./_components/Greetings"
import UpcomingAppointments from "./_components/UpcomingAppointments"

export default function Component() {
    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8 ">
            <Greetings />
            <CardsRow />
            <UpcomingAppointments />


        </main>
    )
}
