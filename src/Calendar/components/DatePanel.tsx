import { FC, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment/moment";

import { DATE_FORMAT } from "../constants";
import { useCalendar } from "../context";

import DaysGrid from "./DaysGrid";
import { CalendarMode } from "../types";

export interface DatePanelProps {
  className?: string;
  onDateChange?: (date: string) => void;
}

const DatePanel: FC<DatePanelProps> = ({ className, onDateChange }) => {
  const { date, setCalendarMode } = useCalendar();
  const [month, setMonth] = useState<string>(
    date ?? moment().format("YYYY-MM-DD"),
  );

  useEffect(() => {
    setMonth(date ?? moment().format("YYYY-MM-DD"));
  }, [date]);

  /**
   * Function to go to the previous month.
   * It updates the date state using the `setDate` function.
   * The function uses `useCallback` to optimize performance.
   *
   * @function gotoPrevMonth
   * @returns {void}
   */
  const gotoPrevMonth = useCallback(() => {
    setMonth((prev) => {
      const previousMonth = moment(prev).subtract(1, "M");
      const previousMonthEnd = moment(previousMonth).endOf("month");

      if (
        moment(prev).date() !== previousMonth.date() &&
        previousMonth.isSame(previousMonthEnd.format(DATE_FORMAT))
      ) {
        return previousMonth.format(DATE_FORMAT);
      }

      return previousMonthEnd.format(DATE_FORMAT);
    });
  }, []);

  /**
   * A callback function that advances the date to the next month.
   *
   * @function gotoNextMonth
   * @returns {void}
   */
  const gotoNextMonth = useCallback(() => {
    setMonth((prev) => {
      const nextMonth = moment(prev).add(1, "M");
      const nextMonthEnd = moment(nextMonth).endOf("month");

      if (
        moment(prev).date() !== nextMonth.date() &&
        nextMonth.isSame(nextMonthEnd.format(DATE_FORMAT))
      ) {
        return nextMonth.format(DATE_FORMAT);
      }

      return nextMonthEnd.format(DATE_FORMAT);
    });
  }, []);

  return (
    <div className={clsx("flex flex-col", className)}>
      <div className="flex gap-4 text-gray-600 justify-between px-6 py-3 border-b border-b-gray-200">
        <button onClick={gotoPrevMonth} aria-label="Previous Month">
          &lt;&lt;
        </button>
        <div className="font-bold">{moment(month).format("MMMM YYYY")}</div>
        <button onClick={gotoNextMonth} aria-label="Next Month">
          &gt;&gt;
        </button>
      </div>
      <DaysGrid date={month} onDateChange={onDateChange} />
      <div className="p-4 border-t border-t-gray-200">
        <button
          aria-label={`Choose month`}
          className="p-2 bg-blue-600 text-white rounded truncate"
          onClick={() => setCalendarMode(CalendarMode.MONTHS)}
        >
          Choose month
        </button>
      </div>
    </div>
  );
};

export default DatePanel;
