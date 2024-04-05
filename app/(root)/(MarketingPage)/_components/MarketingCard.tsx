
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MarketingCardProps } from "@/types/MarketingCardProps"
import Image from "next/image"

const MarketingCard: React.FC<MarketingCardProps> = ({
    image,
    title,
    description,
}) => (
    <Card className="w-full border shadow">
        <CardHeader>
            <div className=" bg-gray-200 w-[100px] mb-5 rounded-full p-7">
                <Image src={image} width={400} height={400} alt="Image" />
            </div>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {description}
        </CardContent>
    </Card>
)
export default MarketingCard