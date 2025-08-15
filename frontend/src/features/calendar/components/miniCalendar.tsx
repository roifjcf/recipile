import Icon from "@/components/icon/icon";
import { generateCalendarMonthly, numberToMonth } from "@/utils/helper";
import { useState } from "react";

interface Props {
  setSelectedDate: (hookval: Date) => void,
}

const isDateOfCurrentMonth = (date: Date, targetDate: Date) => {
  return (date.getMonth() === targetDate.getMonth());
}


export default function MiniCalendar({
  setSelectedDate,
}: Props) {

  const [temporaryDate, setTemporaryDate] = useState<Date>(new Date());

  const handleUpdateCalendar = (forward: boolean) => {
    let year = temporaryDate.getFullYear();
    let month = temporaryDate.getMonth();
    if (forward) {
      year = (month === 11) ? year + 1 : year;
      month = (month === 11) ? 0 : month + 1;
    } else {
      year = (month === 0) ? year - 1: year;
      month = (month === 0) ? 11 : month - 1;
    }
    setTemporaryDate(new Date(year, month, 1));
  }

  return (
  <div className="minicalendar-container ">

    <div className="minicalendar-header">
      <div className="info">
        <span>{temporaryDate.getFullYear()}</span>
        <span>{numberToMonth(temporaryDate.getMonth())}</span>
      </div>
      <div className="buttons">
        <Icon
          src="arrow-back"
          hoverable={true}
          onClick={()=>handleUpdateCalendar(false)}
        />
        <Icon
          src="arrow-forward"
          hoverable={true}
          onClick={()=>handleUpdateCalendar(true)}
        />
      </div>
    </div>

    <div className="minicalendar-days">
      {generateCalendarMonthly(temporaryDate).map((date, index) =>
      <span
        key={index}
        onClick={()=>setSelectedDate(date)}
        className={`minicalendar-day ${isDateOfCurrentMonth(date, temporaryDate) ? "" : " minicalendr-inactive" }`}
      >
        {date.getDate()}
      </span>)}
    </div>

  </div>);


}