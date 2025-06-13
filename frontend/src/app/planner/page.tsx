'use client';
import { CalendarDisplay } from "@/common/type";
import Icon from "@/components/icon";
import Navbar from "@/components/navbar";
import PlannerSidePanelContext from "@/contexts/plannerSidePanelContext";
import Calendar from "@/features/calendar/calendar";
import MiniCalendar from "@/features/calendar/components/miniCalendar";
import SidePanel from "@/features/sidePanel/sidePanel";
import { getDateByOffset, loadTheme, numberToMonth } from "@/utils/helper";
import { useEffect, useState } from "react";

export default function Page() {
  
  useEffect(() => {
    /** Theme init */
    loadTheme();
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false);
  const [showMiniCalendar, setShowMiniCalendar] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<CalendarDisplay>("month");

  const currentYear = selectedDate.getFullYear();
  const currentMonth = numberToMonth(selectedDate.getMonth());

  const plannerSidePanelContext = {
    showSidePanel: showSidePanel,
    setShowSidePanel: setShowSidePanel,
  }

  const handleResetDate = () => {
    setSelectedDate(new Date());
  }

  const handleUpdateCalendar = (forward: boolean, mode: CalendarDisplay) => {
    if (mode === "day") {
      if (forward) { setSelectedDate(getDateByOffset(selectedDate, 1)); }
      else { setSelectedDate(getDateByOffset(selectedDate, -1)); }
    } else if (mode === "week") {
      if (forward) { setSelectedDate(getDateByOffset(selectedDate, 7)); }
      else { setSelectedDate(getDateByOffset(selectedDate, -7)); }
    } else if (mode === "bi-week") {
      if (forward) { setSelectedDate(getDateByOffset(selectedDate, 14)); }
      else { setSelectedDate(getDateByOffset(selectedDate, -14)); }
    } else if (mode === "month") {
      let year = currentYear;
      let month = selectedDate.getMonth();
      if (forward) {
        year = (month === 11) ? year + 1 : year;
        month = (month === 11) ? 0 : month + 1;
      } else {
        year = (month === 0) ? year - 1: year;
        month = (month === 0) ? 11 : month - 1;
      }
      setSelectedDate(new Date(year, month, 1));
    }
  }

  return (
  <PlannerSidePanelContext.Provider value={plannerSidePanelContext}>

    <div className="planner-main-container">

      <Navbar />
      <div className="planner-header">
        <div className="left">
          <div className="planner-mini-calendar">
            <Icon
              src="calendar-outline"
              hoverable={true}
              onClick={() => setShowMiniCalendar(!showMiniCalendar)}
            />
            {showMiniCalendar &&
            <MiniCalendar setSelectedDate={setSelectedDate} />}
          </div>
          <h2>{currentYear} {currentMonth}</h2>
          {displayMode !== "day" &&
          <>
            <Icon
              src="arrow-back"
              hoverable={true}
              onClick={()=>handleUpdateCalendar(false, displayMode)}
            />
            <Icon
              src="arrow-forward"
              hoverable={true}
              onClick={()=>handleUpdateCalendar(true, displayMode)}
            />
          </>}
          <button onClick={handleResetDate}>Today</button>
        </div>

        <div className="right">
          <button className={displayMode==="day" ? "active-button" : ""} onClick={()=>setDisplayMode("day")}>Day</button>
          <button className={displayMode==="week" ? "active-button" : ""} onClick={()=>setDisplayMode("week")}>Week</button>
          <button className={displayMode==="bi-week" ? "active-button" : ""} onClick={()=>setDisplayMode("bi-week")}>Bi-week</button>
          <button className={displayMode==="month" ? "active-button" : ""} onClick={()=>setDisplayMode("month")}>Month</button>
        </div>
      </div>

      <Calendar
        selectedDate={selectedDate}
        display={displayMode}
        handleUpdateCalendar={handleUpdateCalendar}
      />

      {showSidePanel && <SidePanel />}
    </div>

  </PlannerSidePanelContext.Provider>
  )
}