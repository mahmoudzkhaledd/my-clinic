import { Package, PackageAdvantage } from "@prisma/client";

export default interface PakcageCardProps extends Package {
    advantages: PackageAdvantage[],
}