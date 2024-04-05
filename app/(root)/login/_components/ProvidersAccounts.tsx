import { Button } from '@/components/ui/button'
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
export default function ProvidersAccounts() {
    return (
        <>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Button variant={'outline'} className='shadow flex gap-2 items-center'>
                    <FaGoogle />
                    Google
                </Button>
                <Button variant={'outline'} className='shadow flex gap-2 items-center'>
                    <FaFacebook />
                    Facebook
                </Button>

            </div>

        </>
    )
}
