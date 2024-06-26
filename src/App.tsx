import "./styles.css";

import { useState } from "react";
import moment from "moment";
import clsx from "clsx";

import Calendar from "./Calendar";

export default function App() {
  const [date, setDate] = useState<string>();

  const handleDateChange = (date: string) => {
    setDate(moment(date).format("dddd, MMMM Do YYYY"));
  };

  return (
    <div className={clsx("App", "flex flex-col gap-4")}>
      <div className="font-bold">{date}</div>
      <Calendar date={date} onDateChange={handleDateChange} />
    </div>
  );
}
