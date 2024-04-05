
// import { Button } from "@/components/ui/button"
// import { CardContent, Card } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { useForm } from "react-hook-form"

// export default function SettingsPage() {
//     const form = useForm();
//     return (
//         <div className=" space-y-4">

//             <Card className="w-full max-w-sm mx-auto">
//                 <CardContent className="p-6">
//                     <div className="space-y-6 text-center">
//                         <h2 className="text-lg font-semibold">Edit clinic</h2>
//                         <div className="space-y-2">
//                             <Label className="flex items-center space-x-2" htmlFor="name">
//                                 Name
//                             </Label>
//                             <Input defaultValue="Sarah Day" id="name" placeholder="Enter your name" />
//                             <Label className="flex items-center space-x-2" htmlFor="email">
//                                 Email
//                             </Label>
//                             <Input defaultValue="sarah.day@example.com" id="email" placeholder="Enter your email" type="email" />

//                         </div>
//                         <Button>Save changes</Button>
//                     </div>
//                 </CardContent>
//             </Card>
//             <Card className="w-full max-w-sm mx-auto">
//                 <CardContent className="p-6">
//                     <div className="space-y-6 text-center">
//                         <h2 className="text-lg font-semibold">Delete your account</h2>
//                         <p className="text-sm text-gray-500">Once your account is deleted, it cannot be recovered.</p>
//                         <Button size="sm" variant="outline">
//                             Delete account
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }


import { Heading } from "@/components/ui/heading";
import DeleteClinicComp from "./_components/DeleteClinicComp";

export default function SettingsPage() {
    return (
        <div>
            <Heading
                title="Settings"
                description="Customize your clinic's online presence and operations with ease through our intuitive settings page."
            />
            <hr className="mb-[30px] mt-3"/>
            <DeleteClinicComp />

        </div>
    )
}
