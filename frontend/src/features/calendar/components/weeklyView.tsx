import { generateCalendarWeekly } from "@/utils/helper";
import Day from "./day";

interface Props {
  selectedDate: Date,
};

export default function WeeklyView({
  selectedDate,
}: Props) {
  
  return (
  <div className="weeklyview-container">
    {generateCalendarWeekly(selectedDate).map((day, index) =>
    <Day key={index} day={day} />
    )}
  </div>

  );
}