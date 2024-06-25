import "./styles.css";
import Calendar from "./Calendar";
import { useState } from "react";
import moment from "moment/moment";
import clsx from "clsx";

export default function App() {
  const [date, setDate] = useState<string>("");

  const handleDateChange = (date: string) => {
    setDate(moment(date).format("dddd, MMMM Do YYYY"));
  };

  return (
    <div className={clsx("App", "flex flex-col gap-4")}>
      <Calendar onDateChange={handleDateChange} />
      <div className="font-bold">{date}</div>
    </div>
  );
}
