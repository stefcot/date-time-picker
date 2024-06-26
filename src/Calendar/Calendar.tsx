import React, { FC, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import { Panel } from "./components";

import type { CalendarProps } from "./types";
import { CalendarProvider } from "./context";

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
//  6a. have some locale labels and input masks (FR, EN)
//  6a. type a masked value and populate state and children components
// 7. Fill in the masked input when selecting values with the children components

const Calendar: FC<CalendarProps> = ({ onDateChange, date }) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Function to handle toggling the visibility of the panel.
   *
   * @returns {void}
   */
  const handleTogglePanelVisibility = (): void => setIsOpen(!isOpen);

  /**
   * Handles the change of date.
   *
   * @param {string} date - The new date.
   */
  const handleDateChange = (date: string) => {
    handleTogglePanelVisibility();
    onDateChange?.(date);
  };

  return (
    <CalendarProvider date={date}>
      <button
        onClick={handleTogglePanelVisibility}
        className="p-2 mt-2 bg-blue-600 text-white rounded"
      >
        Toggle Calendar
      </button>
      <Panel onDateChange={handleDateChange} open={isOpen} />
    </CalendarProvider>
  );
};

export default Calendar;
