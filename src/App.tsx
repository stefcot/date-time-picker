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
    <div className={clsx("App", "flex gap-4")}>
      <Calendar date={date} onDateChange={handleDateChange} />
      <div className="flex items-center p-3 font-bold bg-white/50 text-blue-900 rounded">
        {date}
      </div>
    </div>
  );
};

export default App;
