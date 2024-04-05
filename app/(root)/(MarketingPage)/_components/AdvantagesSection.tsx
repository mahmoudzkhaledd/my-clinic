import { homePageConstants } from "../_constants/HomePageConstants";
import AdvantageComponents from "./AdvantageComponent";


export default function AdvantagesSection() {
  return (
    <div className=" space-y-6 divide-y-2">
      {
        homePageConstants.advantages.map((e, idx) => <AdvantageComponents key={idx} {...e} />)
      }
    </div>
  )
}
