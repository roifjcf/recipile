import { createContext } from "react";

interface contextInterface {
  addNotificationMessage?: (hookval: string) => void,
};

const ManageContext = createContext<contextInterface | undefined>(undefined);
export default ManageContext;