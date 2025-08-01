import { createContext } from "react";

interface contextInterface {
  addNotificationMessage?: (hookval: string) => void,
};

const PushNotificationContext = createContext<contextInterface | undefined>(undefined);
export default PushNotificationContext;