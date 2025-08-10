import { PushNotificationStatus } from "@/common/type";
import { createContext } from "react";

interface contextInterface {
  addNotificationMessage?: (msg: string, status: PushNotificationStatus) => void,
};

const PushNotificationContext = createContext<contextInterface | undefined>(undefined);
export default PushNotificationContext;