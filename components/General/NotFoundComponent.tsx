import Image from "next/image";


export default function NotFoundComponent({
    children,
    title,
    subTitle,
    image,
}: { children?: React.ReactNode, image?: string, title?: string, subTitle?: string, }) {
    return (
        <div className="h-full w-full flex  flex-col items-center justify-center text-center">
            {
                image && <Image className="mb-5" width={400} height={400} src={image} alt="imaeg" />
            }
            <h2 className=" text-lg font-bold mb-2">{title}</h2>
            <p className="mb-3 text-center text-gray-500">{subTitle}</p>
            {children}
        </div>
    )
}
