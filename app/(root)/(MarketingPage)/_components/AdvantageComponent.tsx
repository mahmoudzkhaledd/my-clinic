import { cn } from "@/lib/utils";
import { AdvantageProps } from "@/types/AdvantageProps";
import { Check } from "lucide-react";
import Image from "next/image";

const AdvantageComponents: React.FC<AdvantageProps> = ({
    title,
    advantages,
    imageSrc,
    reversed,
}) => (
    <div className={cn(
        "w-full flex flex-col-reverse lg:justify-between lg:items-center gap-4",
        {
            "lg:flex-row": reversed,
            "lg:flex-row-reverse": !reversed,
        }
    )}>
        <div className="flex-[3]">
            <h2 className="mb-6 text-xl font-bold">{title}</h2>
            <div className="space-y-3">
                {
                    advantages.map((e, idx) =>
                        <div key={idx} className="flex gap-2 items-center">
                            <Check />
                            {e}
                        </div>)
                }
            </div>
        </div>
        <div className="flex-[4]">
            <Image
                src={imageSrc} className="m-auto"
                width={500} height={500} alt="Image" />
        </div>
    </div>)
export default AdvantageComponents;