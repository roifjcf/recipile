import { getDateByOffset } from "@/utils/helper";
import WeeklyView from "./weeklyView";

interface Props {
  selectedDate: Date,
};

export default function BiWeeklyView({
  selectedDate,
}: Props) {
  return (
  <div className="biweeklyview-container">
    <WeeklyView selectedDate={selectedDate}/>
    <WeeklyView selectedDate={getDateByOffset(selectedDate, 7)}/>
  </div>

  );
}