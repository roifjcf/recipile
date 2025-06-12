import { getDateByOffset } from "@/utils/helper";
import Day from "./day";
import Icon from "@/components/icon";

interface Props {
  selectedDate: Date,
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DailyView({
  selectedDate,
}: Props) {

  const yesterday = getDateByOffset(selectedDate,-1);
  const today = selectedDate;
  const tomorrow = getDateByOffset(selectedDate,1);

  return (
  <div className="dailyview-container">
    <div className="dailyview-arrow">
      <Icon
        src={"arrow-back"}
        hoverable={true}
      />
    </div>

    <div className="dailyview-main">
      <div className="dailyview-header">
        <div>{days[yesterday.getDay()]}</div>
        <div>{days[today.getDay()]}</div>
        <div>{days[tomorrow.getDay()]}</div>
      </div>
      <div className="dailyview-cards">
        <Day day={yesterday.getDate()} />
        <Day day={today.getDate()} />
        <Day day={tomorrow.getDate()} />
      </div>
    </div>

    <div className="dailyview-arrow">
      <Icon
        src={"arrow-forward"}
        hoverable={true}
      />
    </div>
  </div>

  );
}