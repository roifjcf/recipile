import { generateCalendarMonthly } from "@/utils/helper";
import Day from "./day";

interface Props {
  selectedDate: Date,
};

export default function MonthlyView({
  selectedDate,
}: Props) {

  
  return (
  <div className="monthlyview-container">
    {generateCalendarMonthly(selectedDate).map((date, index) =>
      <Day
        key={index}
        date={date}
      />)}
  </div>



  );
}