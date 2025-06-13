import Todos from "../ui/Todos";
import React, { useCallback, useEffect } from "react";

export default function Body() {
  const [tasks, setTasks] = React.useState([]);
  const [done, setDone] = React.useState([]);
  const fetchData = useCallback(function () {
    fetch("https://dailygoals-nd3o.onrender.com/")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
        setDone(data.done);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex p-10 flex-col flex-grow items-center  bg-[rgb(13,7,20)] gap-5">
      <Todos tasks={tasks} done={done} fetchData={fetchData} />
    </div>
  );
}
