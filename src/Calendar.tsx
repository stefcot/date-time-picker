import React, { FC, useState, useEffect, useCallback } from "react";
import moment from "moment";
import clsx from "clsx";

const weekDays: Record<string, string[]> = {
  FR: ["L", "M", "M", "J", "V", "S", "D"],
  EN: ["M", "T", "W", "T", "F", "S", "S"],
};

const DATE_FORMAT = "YYYY-MM-DD";

// Have some locale labels and input masks (FR, EN)

// 1. a component panel to contains either date or time
//  1a. Click away for panel
// 2. a component to display days in a month
//  2a. a component for going backward/forward (months)
//  2b. draw a seven column grid based on week
//  2c. keep necessary days for previous and next month
//  2d. get first month day, the week day of the first month day for the previous current and next month
// 3. assign click event for days of the currently selected month of the currently selected year
// 4. a component to display and edit datetime value (use an input mask)
// 5. an onChange handler to emit the value
// 6. have the component being controlled (display the value properly if passed)

// DATE PANEL - compound component to be moved to DaysPanelContent.tsx

interface DaysPanelContentProps {
  /* Date as formatted string "YYYY-MM-DD" */
  date: string;
  /* Locale language in international ISO-truc */
  locale?: keyof typeof weekDays;
  /* Called on date click */
  onDateChange?: (date: string) => void;
}

const DaysPanelContent: FC<DaysPanelContentProps> = ({
  date,
  locale = "FR",
  onDateChange,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [arrayOfDates, setArrayOfDates] = useState<string[]>([]);

  useEffect(() => {
    setStartIndex(
      moment(`${date.split("-")[0]}-${date.split("-")[1]}-01`)
        .clone()
        .day(),
    );
    setEndIndex(moment(date).clone().day());
    setArrayOfDates(() => {
      const startOfMonth = moment(date).clone().startOf("month");
      const endOfMonth = moment(date).clone().endOf("month");
      const arr = [];
      for (
        let day = startOfMonth;
        day.isSameOrBefore(endOfMonth);
        day.add(1, "days")
      ) {
        arr.push(day.clone().format(DATE_FORMAT));
      }
      return arr;
    });
  }, [date]);

  const handleDateClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const clickedDate = event.currentTarget.dataset.date;
      if (clickedDate) {
        onDateChange?.(clickedDate);
      }
    },
    [],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleDateClick(event as never);
    }
  };

  return (
    <div className="grid grid-cols-7 gap-y-3 p-3 h-full">
      {weekDays[locale].map((name: string, index: number) => (
        <div key={`${name}-${index}`} className="flex justify-center">
          <span
            className={
              "flex justify-center font-bold items-center text-gray-800 h-9 w-9"
            }
          >
            {name}
          </span>
        </div>
      ))}
      {Array.from({ length: startIndex }, (_, index) => index).map(
        (value: number, index: number) => (
          <div key={`${value}-${index}`} />
        ),
      )}
      {arrayOfDates.map((value: string, index: number) => (
        <div key={value} className="flex justify-center">
          <span
            tabIndex={0}
            role={"button"}
            data-date={value}
            onClick={handleDateClick}
            onKeyDown={handleKeyDown}
            className={clsx(
              "flex items-center justify-center text-gray-800 transition duration-500 h-9 w-9 rounded",
              "focus:outline-none focus-visible:outline-amber-200 hover:bg-amber-200",
              {
                "font-bold bg-amber-400 hover:bg-amber-700 hover:text-amber-100":
                  moment().format(DATE_FORMAT) ===
                  moment(value).format(DATE_FORMAT),
              },
            )}
          >
            {index + 1}
          </span>
        </div>
      ))}
      {Array.from({ length: 7 - endIndex }, (_, index) => index).map(
        (value: number, index: number) => (
          <div key={`${value}-${index}`} />
        ),
      )}
    </div>
  );
};

// CALENDAR COMPONENT - component to be moved to Calendar.tsx

interface CalendarProps {
  /* Date as formatted string "YYYY-MM-DD" */
  date?: string;
  /* Locale language in international ISO-truc */
  locale?: keyof typeof weekDays;
  /* Called on date click */
  onDateChange?: (date: string) => void;
}

const Calendar: FC<CalendarProps> = ({ onDateChange }) => {
  const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));

  const gotoNextMonth = useCallback(() => {
    setDate((prev) => {
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

  const gotoPrevMonth = useCallback(() => {
    setDate((prev) => {
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

  return (
    <div className="flex flex-col gap-2 max-w-[400px] bg-white rounded-md shadow-lg">
      <div className="flex gap-4 text-gray-600 justify-center p-3 border-b border-b-gray-200">
        <button onClick={gotoPrevMonth} aria-label="Previous Month">
          &lt;&lt;
        </button>
        <div className="font-bold">{moment(date).format("MMMM YYYY")}</div>
        <button onClick={gotoNextMonth} aria-label="Next Month">
          &gt;&gt;
        </button>
      </div>
      <DaysPanelContent date={date} onDateChange={onDateChange} />
    </div>
  );
};

export default Calendar;
