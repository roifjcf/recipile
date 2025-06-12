import { CalendarDisplay } from "@/common/type";
import MonthlyView from "./components/monthlyView";
import DailyView from "./components/dailyView";
import WeeklyView from "./components/weeklyView";
import BiWeeklyView from "./components/biWeeklyView";


interface Props {
  year: number,
  month: number,
  selectedDate: Date,
  display: CalendarDisplay,
}

export default function Calendar({
  year,
  month,
  selectedDate,
  display,
}: Props) {

  const headerMon = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // const headerSun = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const view = {
    "month": <MonthlyView year={year} month={month} />,
    "day": <DailyView selectedDate={selectedDate}/>,
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