import { FC, memo } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import { useCalendar } from "../context";
import { FADE_ANIMATION_DURATION } from "../constants";

import ClickAwayListener from "./ClickAwayListener";
import DatePanel from "./DatePanel";
import MonthsPanel from "./MonthsPanel";

import { CalendarMode } from "../types";

import type { CalendarProps } from "../types";

interface PanelProps extends CalendarProps {
  onClickOutside: () => void;
}

const Panel: FC<PanelProps> = ({ onDateChange, open, onClickOutside }) => {
  const { calendarMode, setCalendarMode } = useCalendar();

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
            {calendarMode === CalendarMode.DAYS && (
              <ClickAwayListener onClickAway={onClickOutside}>
                <DatePanel onDateChange={onDateChange} />
              </ClickAwayListener>
            )}
            {calendarMode === CalendarMode.MONTHS && (
              <ClickAwayListener onClickAway={onClickOutside}>
                <MonthsPanel
                  onDateChange={(e) => {
                    setTimeout(
                      () => setCalendarMode(CalendarMode.DAYS),
                      FADE_ANIMATION_DURATION,
                    );
                    onDateChange?.(e);
                  }}
                />
              </ClickAwayListener>
            )}
          </div>
        </CSSTransition>,
        document.body,
      )}
    </>
  );
};

export default memo(Panel);
