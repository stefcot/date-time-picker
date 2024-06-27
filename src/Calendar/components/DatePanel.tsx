import { FC, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment/moment";

import { DATE_FORMAT } from "../constants";
import { useCalendar } from "../context";

import DaysGrid from "./DaysGrid";

import ArrowLeftIcon from "../assets/arrow-narrow-left.svg?react";
import ArrowRightIcon from "../assets/arrow-narrow-right.svg?react";

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
        <ArrowLeftIcon
          aria-hidden
          aria-label="Previous Month"
          className="w-[24px] fill-gray-800 cursor-pointer"
          onClick={gotoPrevMonth}
        />
        <div className="flex font-bold gap-1">
          <button
            aria-label={moment(month).format("MMMM")}
            className="hover:text-blue-700 transition-colors duration-500"
            onClick={() => {
              setCalendarMode(CalendarMode.MONTHS);
            }}
          >
            {moment(month).format("MMMM")}
          </button>
          <button
            aria-label={moment(month).format("YYYY")}
            className="hover:text-blue-700 transition-colors duration-500"
            onClick={() => {
              setCalendarMode(CalendarMode.YEARS);
            }}
          >
            {moment(month).format("YYYY")}
          </button>
        </div>
        <ArrowRightIcon
          aria-hidden
          aria-label="Next Month"
          className="w-[24px] fill-gray-800 cursor-pointer"
          onClick={gotoNextMonth}
        />
      </div>
      <DaysGrid date={month} onDateChange={onDateChange} />
    </div>
  );
};

export default DatePanel;
