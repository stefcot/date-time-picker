import React, { FC, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment";

import { DATE_FORMAT } from "../constants";
import { useCalendar } from "../context";

import type { BasicCalendarProps } from "../types";

const DaysGrid: FC<BasicCalendarProps> = ({
  date,
  locale = "FR",
  onDateChange,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [arrayOfDates, setArrayOfDates] = useState<string[]>([]);

  const { date: selectedDate } = useCalendar();

  useEffect(() => {
    setStartIndex(
      moment(`${date?.split("-")[0]}-${date?.split("-")[1]}-01`)
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
    [onDateChange],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleDateClick(event as never);
    }
  };

  return (
    <div className="grid grid-cols-7 gap-y-3 p-3 h-full">
      {moment.weekdaysShort().map((name: string, index: number) => (
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
              {
                "font-bold bg-amber-200 hover:bg-amber-700 hover:text-amber-100":
                  selectedDate === moment(value).format(DATE_FORMAT),
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

export default DaysGrid;
