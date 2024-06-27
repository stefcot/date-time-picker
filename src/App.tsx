import "./styles.css";

import { FC, useState } from "react";
import moment from "moment";
import clsx from "clsx";

import Calendar from "./Calendar";

const App: FC = () => {
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
};

export default App;
