import PlannerSidePanelContext from "@/contexts/plannerSidePanelContext";
import { useContext } from "react";

interface Props {
  key?: number,
  day: number, // 1-31
}

export default function Day({
  day,
}: Props) {

  const context = useContext(PlannerSidePanelContext);


  const handleClick = () => {
    context?.setShowSidePanel(true);
  }

  return (
  <div
    className="day-container"
    onClick={handleClick}
  >
    <div className="day-number">{day}</div>
    

    
    {/* background */}
    <div className="day-background-container">
      <img className="day-background" src="icons/add-outline.png" alt="icons/add-outline.png" />
    </div>
  </div>
  );

}