"use client"
import { useAuthX } from "@/authX/Provider/AuthXProvider"

export default function Greetings() {
    const user = useAuthX()?.user;

    return (
        <h2 className=" font-extrabold text-4xl my-4">
            Hi {user?.name}, Welcome back 👋
        </h2>
    )
}
