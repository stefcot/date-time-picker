import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment/moment";

import { DATE_FORMAT } from "../constants";
import { useCalendar } from "../context";

export interface MonthsPanelProps {
  className?: string;
  onDateChange?: (date: string) => void;
}

const MonthsPanel: FC<MonthsPanelProps> = ({ className, onDateChange }) => {
  const { date } = useCalendar();
  const [month, setMonth] = useState<string>(
    date ?? moment().format("YYYY-MM-DD"),
  );

  useEffect(() => {
    setMonth(date ?? moment().format("YYYY-MM-DD"));
  }, [date]);

  /**
   * Function to go to the previous year.
   * It updates the date state using the `setDate` function.
   * The function uses `useCallback` to optimize performance.
   *
   * @function gotoPrevYear
   * @returns {void}
   */
  const gotoPrevYear = useCallback(() => {
    setMonth((prev) => {
      return moment(prev).subtract(1, "years").format(DATE_FORMAT);
    });
  }, []);

  /**
   * A callback function that advances the date to the next year.
   *
   * @function gotoNextYear
   * @returns {void}
   */
  const gotoNextYear = useCallback(() => {
    setMonth((prev) => {
      return moment(prev).add(1, "years").format(DATE_FORMAT);
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
        <button onClick={gotoPrevYear} aria-label="Previous Year">
          &lt;&lt;
        </button>
        <div className="font-bold">{moment(month).format("YYYY")}</div>
        <button onClick={gotoNextYear} aria-label="Next Year">
          &gt;&gt;
        </button>
      </div>
      <div role="grid" className="grid grid-cols-3 gap-4 p-4">
        {moment.months().map((monthName) => {
          return (
            <button
              aria-label={`Choose ${monthName}`}
              className={clsx(
                "p-2 border border-gray-100 hover:border-blue-600 hover:bg-blue-600 hover:text-white rounded truncate transition duration-200 ease-in-out",
                {
                  "border-blue-600 bg-blue-600 text-white":
                    moment().month(monthName).format("MM") ===
                    moment(date).format("MM"),
                },
              )}
              data-date={`${month?.split("-")[0]}-${moment().month(monthName).format("MM")}-${month?.split("-")[2]}`}
              onClick={handleDateClick}
            >
              {monthName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MonthsPanel;
