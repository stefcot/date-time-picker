import { WEEK_DAYS } from "./constants";
import { Dispatch, SetStateAction } from "react";

/**
 * Will define the type of panel content to show
 */
export enum CalendarMode {
  DAYS = "DAYS",
  MONTHS = "MONTHS",
  YEARS = "YEARS",
  TIME = "TIME",
}

export interface CalendarProviderProps {
  /* Date as formatted string in ISO 8601: "YYYY-MM-DD", defaults to today */
  date?: string;
}

export interface BasicCalendarProps extends CalendarProviderProps {
  /* Locale language in international ISO-ISO 8601  */
  locale?: keyof typeof WEEK_DAYS;
  /* Called on date click */
  onDateChange?: (date: string) => void;
}

export interface CalendarProps extends BasicCalendarProps {
  /* If true, Will place the panel in a portal, defaults to false */
  enablePortal?: boolean;
  /* If true, the panel is shown, defaults to false */
  open?: boolean;
}

export interface MonthsPanelProps extends CalendarProps {}

export interface CalendarCtx extends CalendarProviderProps {
  /* Setter for the date (provider state) */
  setDate: Dispatch<SetStateAction<string>>;
  /* View mode for the calendar panel */
  mode: CalendarMode;
  /* Setter for the panel view mode (provider state) */
  setMode: Dispatch<SetStateAction<CalendarMode>>;
}
