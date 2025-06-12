'use client';
import { CalendarDisplay } from "@/common/type";
import Icon from "@/components/icon";
import Navbar from "@/components/navbar";
import PlannerSidePanelContext from "@/contexts/plannerSidePanelContext";
import Calendar from "@/features/calendar/calendar";
import SidePanel from "@/features/sidePanel/sidePanel";
import { loadTheme, numberToMonth } from "@/utils/helper";
import { useEffect, useState } from "react";

export default function Page() {
  
  useEffect(() => {
    /** Theme init */
    loadTheme();
  }, []);


  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear()); // for monthly display
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth()); // for monthly display, 0-indexed
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showSidePanel, setShowSidePanel] = useState<boolean>(false);
  const [displayMode, setDisplayMode] = useState<CalendarDisplay>("month");


  const handleLoadPreviousMonth = () => {
    if (currentMonth === 0) {setCurrentYear(currentYear-1);}
    setCurrentMonth((currentMonth-1+12)%12);
  }

  const handleLoadNextMonth = () => {
    if (currentMonth === 11) {setCurrentYear(currentYear+1);}
    setCurrentMonth((currentMonth+1)%12);
  };


  const plannerSidePanelContext = {
    showSidePanel: showSidePanel,
    setShowSidePanel: setShowSidePanel,
  }

  const handleResetDate = () => {
    setCurrentYear(new Date().getFullYear());
    setCurrentMonth(new Date().getMonth());
    setSelectedDate(new Date());
  }



  return (
  <PlannerSidePanelContext.Provider value={plannerSidePanelContext}>

    <div className="planner-main-container">

      <Navbar />
      <div className="planner-header">
        <div className="left">
          <Icon
            src="calendar-outline"
            hoverable={true}
          />
          <h2>{currentYear} {numberToMonth(currentMonth)}</h2>
          {displayMode !== "day" &&
          <>
            <Icon
              src="arrow-back"
              onClick={handleLoadPreviousMonth}
              hoverable={true}
            />
            <Icon
              src="arrow-forward"
              onClick={handleLoadNextMonth}
              hoverable={true}
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
        year={currentYear}
        month={currentMonth}
        selectedDate={selectedDate}
        display={displayMode}
      />

      {showSidePanel && <SidePanel />}
    </div>

  </PlannerSidePanelContext.Provider>
  )
}