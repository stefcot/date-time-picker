import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import moment from "moment";

import { DATE_FORMAT } from "./constants";
import { getDateFormat } from "./utils";
import { CalendarMode } from "./types";

import type { CalendarCtx, CalendarProviderProps } from "./types";

const CalendarContext = createContext<CalendarCtx>({
  date: moment().format(DATE_FORMAT),
  setDate: () => {},
  calendarMode: CalendarMode.DAYS,
  setCalendarMode: () => {},
});

const CalendarProvider: FC<PropsWithChildren<CalendarProviderProps>> = ({
  children,
  date: p_date,
}) => {
  const [calendarMode, setCalendarMode] = useState(CalendarMode.DAYS);
  const [date, setDate] = useState<string>(
    typeof p_date === "undefined" ? moment().format("YYYY-MM-DD") : p_date,
  );
  console.log("CalendarProvider::render - date: ", date);

  /**
   * Will Reformat the date to meet a shape of "YYYY-MM-DD", if defined
   *
   * @returns the date to meet a shape of "YYYY-MM-DD"
   */
  const formatDate = (d?: string): string | undefined => {
    const formattedDate = d
      ? moment(d, getDateFormat(d)).format(DATE_FORMAT)
      : undefined;

    return formattedDate;
  };

  const value = useMemo<CalendarCtx>(() => {
    return {
      calendarMode,
      date: formatDate(p_date) ?? formatDate(date),
      setDate,
      setCalendarMode,
    };
  }, [calendarMode, p_date, date]);

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}

export { CalendarProvider, useCalendar };
