import React, { FC, memo } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import { useCalendar } from "../context";

import DatePanel from "./DatePanel";
import MonthsPanel from "./MonthsPanel";

import { CalendarMode } from "../types";

import type { CalendarProps } from "../types";
import { FADE_ANIMATION_DURATION } from "../constants";

const Panel: FC<CalendarProps> = ({ onDateChange, open }) => {
  const { mode, setMode } = useCalendar();

  return (
    <>
      {createPortal(
        <CSSTransition
          in={open}
          timeout={FADE_ANIMATION_DURATION}
          classNames="fade"
          unmountOnExit
        >
          <div className="flex flex-col gap-2 max-w-[400px] bg-white rounded-md shadow-lg">
            {mode === CalendarMode.DAYS && (
              <DatePanel onDateChange={onDateChange} />
            )}
            {mode === CalendarMode.MONTHS && (
              <MonthsPanel
                onDateChange={(e) => {
                  setTimeout(
                    () => setMode(CalendarMode.DAYS),
                    FADE_ANIMATION_DURATION,
                  );
                  onDateChange?.(e);
                }}
              />
            )}
          </div>
        </CSSTransition>,
        document.body,
      )}
    </>
  );
};

export default memo(Panel);
