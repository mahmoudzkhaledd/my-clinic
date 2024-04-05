import { homePageConstants } from "../_constants/HomePageConstants";
import MarketingCard from "./MarketingCard";

export default function CardsSection() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-7">
      {
        homePageConstants.cardsSection.map((e, idx) => <MarketingCard key={idx} {...e} />)
      }
    </div>
  )
}
