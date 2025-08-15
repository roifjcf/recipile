import { PUSH_NOTIFICATION_TIMEOUT } from "@/common/constant";
import { PushNotificationMessageQueueInterface } from "@/common/type";
import { useEffect } from "react";

interface Props {
  messageQueue: PushNotificationMessageQueueInterface[],
  setMessageQueue: (hookval: PushNotificationMessageQueueInterface[]) => void,
}

export default function PushNotification ({
  messageQueue,
  setMessageQueue,
}: Props){

  useEffect(() => {
    if (messageQueue.length === 0) {return;}

    const messageInterval = setInterval(() => {
      const newQueue = [...messageQueue]; // dequeue
      newQueue.shift();
      setMessageQueue(newQueue);
    }, PUSH_NOTIFICATION_TIMEOUT);

    return () => {clearInterval(messageInterval);}
  }, [messageQueue, setMessageQueue]);
  
  return (
    <div className={`pushnotification-container`}>
      {messageQueue.map((message, index) =>
      <div
        className={`pushnotification-item animation-raise-up
            ${message["status"]==="Neutral"&&"pushnotification-neutral"}
            ${message["status"]==="Success"&&"pushnotification-success"}
            ${message["status"]==="Error"&&"pushnotification-error"}
          `}
        key={index}
      >
        {message["content"]}
      </div>)}
    </div>
  );
}