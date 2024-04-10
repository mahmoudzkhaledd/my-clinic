
import RootNavbar from './_components/RootNavbar/RootNavbar'

export default async function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className='h-full'>
            <div className="absolute bottom-0 -z-10 opacity-50 dark:opacity-100  left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />



            <RootNavbar />
            <div className=" mt-[100px] px-4 md:px-[50px] lg:px-[0px] ">
                {children}
            </div>
            {/* <Footer /> */}
        </div>

    )
}
