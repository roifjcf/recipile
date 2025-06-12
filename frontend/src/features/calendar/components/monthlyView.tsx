import { generateCalendarMonthly } from "@/utils/helper";
import Day from "./day";

interface Props {
  year: number,
  month: number,
};

export default function MonthlyView({
  year,
  month
}: Props) {

  
  return (
  <div className="monthlyview-container">
    {generateCalendarMonthly(year, month).map((date, index) =>
      <Day
        key={index}
        day={date}
      />)}
  </div>



  );
}