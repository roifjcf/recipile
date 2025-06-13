import PlannerSidePanelContext from "@/contexts/plannerSidePanelContext";
import { isToday } from "@/utils/helper";
import { useContext } from "react";

interface Props {
  key?: number,
  date: Date
}

export default function Day({
  date,
}: Props) {

  const context = useContext(PlannerSidePanelContext);


  const handleClick = () => {
    context?.setShowSidePanel(true);
  }

  const numberStyle = `day-number ${isToday(date) ? " day-highlight" : ""}`

  return (
  <div
    className="day-container"
    onClick={handleClick}
  >
    <div className={numberStyle}>{date.getDate()}</div>
    

    
    {/* background */}
    <div className="day-background-container">
      <img className="day-background" src="icons/add-outline.png" alt="icons/add-outline.png" />
    </div>
  </div>
  );

}