import ManageContext from "@/app/manage/manageContext";
import { PUSH_NOTIFICATION_TIMEOUT } from "@/common/constant";
import { useEffect } from "react";

interface Props {
  messageQueue: string[],
  setMessageQueue: (hookval: string[]) => void,
}

export default function PushNotification ({
  messageQueue,
  setMessageQueue
}: Props){

  useEffect(() => {
    if (messageQueue.length === 0) {return;}

    const messageInterval = setInterval(() => {
      const newQueue = [...messageQueue]; // dequeue
      newQueue.shift();
      setMessageQueue(newQueue);
    }, PUSH_NOTIFICATION_TIMEOUT);

    return () => {clearInterval(messageInterval);}
  }, [messageQueue]);
  
  return (
    <div className="pushnotification-container">
      {messageQueue.map((message, index) =>
      <div className="pushnotification-item animation-raise-up" key={index}>
        {message}
      </div>)}
    </div>
  );
}