/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Todos({ tasks, fetchData, done }) {
  const [input, setInput] = useState("");
  const [postion, setPosition] = useState("");

  function handleSubmit() {
    fetch("https://dailygoals-nd3o.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: input }),
    })
      .then((response) => response.json())
      .then(() => {
        setInput("");
      })
      .then(async () => {
        await fetchData();
      })
      .catch((error) => console.error("Error:", error));
  }
  function handleEdit(postion) {
    if (postion == "") {
      alert("id required");
    } else {
      fetch(`https://dailygoals-nd3o.onrender.com/submit/${postion}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: input }),
      })
        .then((response) => response.json())
        .then(() => {
          setPosition("");
        })
        .then(async () => {
          await fetchData();
        })
        .catch((error) => console.error("Error:", error));
    }
  }

  function handleTaskDone(task) {
    fetch("https://dailygoals-nd3o.onrender.com/done", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task }),
    })
      .then((response) => response.json())
      .then(async () => {
        await fetchData();
      })
      .catch((error) => console.error("Error:", error));
  }

  function handleTaskdel(where, id) {
    fetch(`https://dailygoals-nd3o.onrender.com/${where}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async () => {
        await fetchData();
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <>
      <div>
        <div className="flex gap-3">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="p-2 text-lg border-[#3E1671] border-[1px] w-[430px] h-10 rounded-md focus:border-[#3E1671] outline-none text-gray-200"
            type="text"
            name="task"
          />
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="flex items-center justify-center text-3xl text-white h-10 w-10 rounded-md bg-[#9E78CF]"
          >
            +
          </button>
          <input
            onChange={(e) => setPosition(e.target.value)}
            value={postion}
            className="p-2 text-lg border-[#3E1671] border-[1px] w-20 h-10 rounded-md focus:border-[#3E1671] outline-none text-gray-200"
            type="text"
            name="task"
          />
          <button
            onClick={() => {
              handleEdit(postion);
            }}
            className="flex items-center justify-center text-2xl text-white p-1 rounded-md bg-[#9E78CF]"
          >
            edit
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 w-120">
        {tasks.length > 0 && (
          <>
            <h2 className="flex self-start text-3xl text-white">
              Things to do:
            </h2>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-2 bg-[#15101C] text-2xl text-[#9E78CF] h-[75px] w-full rounded-lg"
              >
                <h2>{task.task}</h2>
                <div className="flex items-center justify-between gap-3">
                  <svg
                    onClick={() => {
                      handleTaskDone(task.task);
                      handleTaskdel("delete", task.id);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 hover:text-purple-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                  <svg
                    onClick={() => handleTaskdel("delete", task.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 hover:text-purple-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </>
        )}
        {done.length > 0 && (
          <>
            <h2 className="flex self-start text-3xl text-white">DONE:</h2>
            {done.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-2 bg-[#15101C] text-2xl text-[#9E78CF] h-[75px] w-full rounded-lg"
              >
                <h2>{task.task}</h2>
                <div className="flex items-center justify-between gap-3">
                  <svg
                    onClick={() => handleTaskdel("delete/done", task.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 hover:text-purple-900 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
