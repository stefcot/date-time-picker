import { FC, useState } from "react";

import { Panel } from "./components";

import { CalendarProvider } from "./context";

import DateTimeInput from "./components/DateTimeInput";

import type { CalendarProps } from "./types";

// IMPORTANT: BASED ON ENGLISH LANGUAGE

// [ ] 1. a component panel to contains either date or time
// [X]  1a. Click away for panel
// [ ]  1b. Have the choice between date & time when date picker mode
// [X] 2. a component to display days in a month
// [ ]  2a. a component for going backward/forward (months)
// [X]  2b. draw a seven column grid based on week
// [ ]  2c. keep necessary days for previous and next month
// [X]  2d. get first month day, the week day of the first month day for the previous current and next month
// [X] 3. assign click event for days of the currently selected month of the currently selected year
// [ ] 4. a component to display and edit datetime value (use an input mask)
// [X] 5. an onChange handler to emit the value
// [X] 6. have the component being controlled (display the value properly if passed)
// [ ]  6a. have some locale labels and input masks (FR, EN)
// [X]  6b. type a masked value and populate state and children components
// [X] 7. Fill in the masked input when selecting values with the children components
// [X]  7a. validate and correct user input while typing (years, months, days according to months)
// [ ] 8. Manage panel placement according to the position of the input field in the viewport

const Calendar: FC<CalendarProps> = ({ onDateChange, date }) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Function to handle toggling the visibility of the panel.
   *
   * @returns {void}
   */
  const handleTogglePanelVisibility = (): void => setIsOpen(!isOpen);

  const closePanel = (): void => setIsOpen(false);

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
      <DateTimeInput
        onDateChange={onDateChange}
        onIconClick={handleTogglePanelVisibility}
      />
      <Panel
        onDateChange={handleDateChange}
        open={isOpen}
        onClickOutside={closePanel}
      />
    </CalendarProvider>
  );
};

export default Calendar;
