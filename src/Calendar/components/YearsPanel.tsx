import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment/moment";

import { DATE_FORMAT } from "../constants";
import { useCalendar } from "../context";

import ArrowLeftIcon from "../assets/arrow-narrow-left.svg?react";
import ArrowRightIcon from "../assets/arrow-narrow-right.svg?react";

export interface YearsPanelProps {
  className?: string;
  onDateChange?: (date: string) => void;
}

const YearsPanel: FC<YearsPanelProps> = ({ className, onDateChange }) => {
  const { date } = useCalendar();
  const [year, setYear] = useState<string>(
    date ?? moment().format(DATE_FORMAT),
  );

  useEffect(() => {
    setYear(date ?? moment().format(DATE_FORMAT));
  }, [date]);

  /**
   * Function to go to the previous years range.
   * It updates the date state using the `setDate` function.
   * The function uses `useCallback` to optimize performance.
   *
   * @function gotoPrevYearsRange
   * @returns {void}
   */
  const gotoPrevYearsRange = useCallback(() => {
    setYear((prev) => {
      return moment(prev).subtract(12, "years").format(DATE_FORMAT);
    });
  }, []);

  /**
   * A callback function that advances the date to the next years range.
   *
   * @function gotoNextYearsRange
   * @returns {void}
   */
  const gotoNextYearsRange = useCallback(() => {
    setYear((prev) => {
      return moment(prev).add(12, "years").format(DATE_FORMAT);
    });
  }, []);

  /**
   * Callback function for handling date clicks.
   *
   * @param {React.MouseEvent<HTMLDivElement>} event - The mouse event object.
   */
  const handleDateClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const clickedDate = event.currentTarget.dataset.date;
      if (clickedDate) {
        onDateChange?.(clickedDate);
      }
    },
    [onDateChange],
  );

  return (
    <div className={clsx("flex flex-col", className)}>
      <div className="flex gap-4 text-gray-600 justify-between px-6 py-3 border-b border-b-gray-200">
        <ArrowLeftIcon
          aria-hidden
          aria-label="Previous 12 Years"
          className="w-[24px] fill-gray-800 cursor-pointer"
          onClick={gotoPrevYearsRange}
        />
        <div className="flex font-bold gap-1">
          <span>{moment(year).format("YYYY")}</span>-
          <span>{moment(year).add(12, "years").format("YYYY")}</span>
        </div>
        <ArrowRightIcon
          aria-hidden
          aria-label="Next 12 Years"
          className="w-[24px] fill-gray-800 cursor-pointer"
          onClick={gotoNextYearsRange}
        />
      </div>
      <div role="grid" className="grid grid-cols-3 gap-4 p-4">
        {Array.from({ length: 12 }, (_, i) => i).map((offset) => {
          return (
            <button
              aria-label={`Choose ${moment(year).add(offset, "years").format("YYYY")}`}
              className={clsx(
                "p-2 border border-gray-100 hover:border-blue-600 hover:bg-blue-600 hover:text-white rounded truncate transition duration-200 ease-in-out",
                {
                  "border-blue-600 bg-blue-600 text-white":
                    moment(year).add(offset, "years").format("YYYY") ===
                    moment(date).format("YYYY"),
                },
              )}
              data-date={`${moment(year).add(offset, "years").format("YYYY")}-${year?.split("-")[1]}-${year?.split("-")[2]}`}
              onClick={handleDateClick}
            >
              {moment(year).add(offset, "years").format("YYYY")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default YearsPanel;
