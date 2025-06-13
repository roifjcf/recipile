import Icon from "@/components/icon";
import PlannerSidePanelContext from "@/contexts/plannerSidePanelContext";
import { useContext, useEffect } from "react";

interface Props {
}

export default function SidePanel({
}: Props) {

  const context = useContext(PlannerSidePanelContext);

  const handleClose = () => {
    context?.setShowSidePanel(false);
  }

  const handleKeyPress = (e: KeyboardEvent) => {if (e.key === "Escape") {handleClose()}};
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {window.removeEventListener('keydown', handleKeyPress);};
  }, []);


  return <div className="sidepanel-container">
    <Icon
      src="double-arrow-forward"
      hoverable={true}
      onClick={handleClose}
    />
  </div>;
}