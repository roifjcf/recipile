import { getDateByOffset } from "@/utils/helper";
import Day from "./day";
import Icon from "@/components/icon";
import { CalendarDisplay } from "@/common/type";

interface Props {
  selectedDate: Date,
  handleUpdateCalendar: (forward: boolean, mode: CalendarDisplay) => void
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DailyView({
  selectedDate,
  handleUpdateCalendar,
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
        onClick={()=>handleUpdateCalendar(false, "day")}
      />
    </div>

    <div className="dailyview-main">
      <div className="dailyview-header">
        <div>{days[yesterday.getDay()]}</div>
        <div>{days[today.getDay()]}</div>
        <div>{days[tomorrow.getDay()]}</div>
      </div>
      <div className="dailyview-cards">
        <Day date={yesterday} />
        <Day date={today} />
        <Day date={tomorrow} />
      </div>
    </div>

    <div className="dailyview-arrow">
      <Icon
        src={"arrow-forward"}
        hoverable={true}
        onClick={()=>handleUpdateCalendar(true, "day")}
      />
    </div>
  </div>

  );
}