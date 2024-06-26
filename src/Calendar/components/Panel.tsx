import React, { FC, memo } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import { useCalendar } from "../context";

import DatePanelContent from "./DatePanelContent";

import { CalendarMode } from "../types";

import type { CalendarProps } from "../types";

const Panel: FC<CalendarProps> = ({ onDateChange, open }) => {
  const { mode } = useCalendar();

  return (
    <>
      {createPortal(
        <CSSTransition in={open} timeout={300} classNames="fade" unmountOnExit>
          <div className="flex flex-col gap-2 max-w-[400px] bg-white rounded-md shadow-lg">
            {mode === CalendarMode.DAYS && (
              <DatePanelContent onDateChange={onDateChange} />
            )}
          </div>
        </CSSTransition>,
        document.body,
      )}
    </>
  );
};

export default memo(Panel);
