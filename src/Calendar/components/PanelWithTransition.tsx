import { FC, memo } from "react";
import { CSSTransition } from "react-transition-group";

import { useCalendar } from "../context";
import { FADE_ANIMATION_DURATION } from "../constants";

import ClickAwayListener from "./ClickAwayListener";
import DatePanel from "./DatePanel";
import MonthsPanel from "./MonthsPanel";
import YearsPanel from "./YearsPanel";

import { CalendarMode } from "../types";

import type { CalendarProps } from "../types";
import clsx from "clsx";

interface PanelProps extends CalendarProps {
  onClickOutside: () => void;
  onDateChangeOnly?: (date: string) => void;
}

const PanelWithTransition: FC<PanelProps> = ({
  enablePortal,
  onDateChange,
  onClickOutside,
  onDateChangeOnly,
  open,
}) => {
  const { calendarMode, setCalendarMode } = useCalendar();

  return (
    <CSSTransition
      in={open}
      timeout={FADE_ANIMATION_DURATION}
      classNames="fade"
      unmountOnExit
    >
      <div
        className={clsx(
          "flex flex-col gap-2 w-[400px] bg-white rounded-md shadow-lg",
          { "absolute left-0 top-[54px]": !enablePortal },
        )}
      >
        <ClickAwayListener
          onClickAway={() => {
            setTimeout(
              () => setCalendarMode(CalendarMode.DAYS),
              FADE_ANIMATION_DURATION,
            );
            onClickOutside();
          }}
        >
          {calendarMode === CalendarMode.DAYS && (
            <DatePanel onDateChange={onDateChange} />
          )}
          {calendarMode === CalendarMode.MONTHS && (
            <MonthsPanel
              onDateChange={(date) => {
                setCalendarMode(CalendarMode.DAYS);
                onDateChangeOnly?.(date);
              }}
            />
          )}
          {calendarMode === CalendarMode.YEARS && (
            <YearsPanel
              onDateChange={(date) => {
                setCalendarMode(CalendarMode.DAYS);
                onDateChangeOnly?.(date);
              }}
            />
          )}
        </ClickAwayListener>
      </div>
    </CSSTransition>
  );
};

export default memo(PanelWithTransition);
