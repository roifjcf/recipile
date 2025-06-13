import { CalendarDisplay } from "@/common/type";
import MonthlyView from "./components/monthlyView";
import DailyView from "./components/dailyView";
import WeeklyView from "./components/weeklyView";
import BiWeeklyView from "./components/biWeeklyView";


interface Props {
  selectedDate: Date,
  display: CalendarDisplay,
  handleUpdateCalendar: (forward: boolean, mode: CalendarDisplay) => void
}

export default function Calendar({
  selectedDate,
  display,
  handleUpdateCalendar,
}: Props) {

  const headerMon = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // const headerSun = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const view = {
    "month": <MonthlyView selectedDate={selectedDate}/>,
    "day": <DailyView selectedDate={selectedDate} handleUpdateCalendar={handleUpdateCalendar}/>,
    "week": <WeeklyView selectedDate={selectedDate}/>,
    "bi-week": <BiWeeklyView selectedDate={selectedDate}/>,
  };

  return (
  <div className="calendar-container">
    {display !== "day" &&
    <div className="calendar-header">
      {headerMon.map((header, index) =><div key={index}>{header}</div> )}
    </div>}
    {view[display]}
  </div>
  );

}