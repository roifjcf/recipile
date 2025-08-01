import { createContext } from "react";

interface ContextInterface {
  showSidePanel: boolean,
  setShowSidePanel: (hookval: boolean) => void,
  sidePanelDate: Date,
};

const PlannerSidePanelContext = createContext<ContextInterface | undefined>(undefined);
export default PlannerSidePanelContext;