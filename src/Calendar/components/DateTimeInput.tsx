import { ChangeEvent, FC, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import moment from "moment";

import { useCalendar } from "../context";

import CalendarIcon from "../assets/calendar.svg?react";

interface DateTimeInputProps {
  onDateChange?: (date: string) => void;
  onIconClick: () => void;
}

/**
 * Depends on the date variable stored in the context, has its own state allowing to control the masked input.
 *
 * @param onDateChange
 */
const DateTimeInput: FC<DateTimeInputProps> = ({
  onDateChange,
  onIconClick,
}) => {
  // Date input mask - default shape 0000/00/00
  const digit = /[0-9]/;
  const month1 = /[0-2]/;
  const day1 = /[0-3]/;
  const mask = [
    digit,
    digit,
    digit,
    digit,
    "/",
    month1,
    digit,
    "/",
    day1,
    digit,
  ];

  const { date, setDate } = useCalendar();
  const [inputValue, setInputValue] = useState(date);

  useEffect(() => {
    setInputValue(date);
  }, [date]);

  /**
   * Will validate and correct user input when typing year
   *
   * @param input
   */
  const validateYearEN = (input: string) => {
    let newInputValue = input;

    if (newInputValue[0] !== "_") {
      if (parseInt(newInputValue[0], 10) < 2) {
        newInputValue = "2" + newInputValue.slice(1);
      }
    }

    return newInputValue;
  };

  /**
   * Will validate and correct user input when typing month
   *
   * @param input
   */
  const validateMonthEN = (input: string) => {
    let newInputValue = input;

    if (newInputValue[5] !== "_") {
      if (parseInt(newInputValue[5], 10) > 1) {
        newInputValue =
          newInputValue.slice(0, 5) + "_" + newInputValue.slice(6);
      }
    }

    if (newInputValue[6] !== "_") {
      if (
        parseInt(newInputValue[5], 10) >= 1 &&
        parseInt(newInputValue[6], 10) > 2
      ) {
        newInputValue =
          newInputValue.slice(0, 6) + "2" + newInputValue.slice(6);
      }
    }

    return newInputValue;
  };

  /**
   * Will validate and correct user input when typing day
   *
   * @param input
   */
  const validateDayEN = (input: string) => {
    let newInputValue = input;
    const daysInMonth = moment(newInputValue, "YYYY/MM")
      .daysInMonth()
      .toString();

    if (newInputValue[8] !== "_") {
      if (parseInt(newInputValue[8], 10) > parseInt(daysInMonth[0], 10)) {
        newInputValue =
          newInputValue.slice(0, 8) + daysInMonth[0] + newInputValue.slice(9);
      }
    }

    if (newInputValue[9] !== "_") {
      if (parseInt(newInputValue[8], 10) === parseInt(daysInMonth[0], 10)) {
        newInputValue = newInputValue.slice(0, 9) + daysInMonth[1];
      }
    }

    return newInputValue;
  };

  return (
    <div className="flex flex-col">
      <label className="flex w-full text-center p-3" htmlFor="custom-input">
        Date
      </label>
      <div className="flex flex-col relative">
        <InputMask
          mask={mask}
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            let newInputValue = validateYearEN(e.target.value);
            newInputValue = validateMonthEN(newInputValue);
            newInputValue = validateDayEN(newInputValue);

            setInputValue(newInputValue);

            if (moment(newInputValue).isValid()) {
              setDate(newInputValue);
              onDateChange?.(newInputValue);
            }
          }}
        >
          <input className="h-10 p-3 rounded bg-white hover:shadow-[0_0_0_2px_rgb(29,78,216,0.5)] focus:outline-none focus-visible:outline-none focus:shadow-[0_0_0_4px_rgb(29,78,216,0.5),0_0_0_2px_rgb(29,78,216)]" />
        </InputMask>
        <CalendarIcon
          onClick={onIconClick}
          className="absolute w-[24px] top-1/2 -translate-y-[50%] right-3 fill-blue-700 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DateTimeInput;
