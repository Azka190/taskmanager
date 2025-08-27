"use client";
import React from "react";
import { Task } from "./types";

type Props = {
  completedTasks: Task[];
  deleteHandle: (task: Task) => void;
};

const Completed: React.FC<Props> = ({ completedTasks, deleteHandle }) => {
  const renderTaskList = (tasks: Task[]) =>
    tasks.map((t, i) => (
      <li key={i} className="border border-[#A1A3AB] rounded-[14px] w-full px-4 mb-2 p-3  mt-4 ">
        <div
  className={`flex flex-col gap-1 ${
    t.status === "Completed" ? "text-gray-500" : ""
  }`}
>
  <div>
    <h5 className="text-base font-semibold">{t.title}</h5>
    <h6 className="text-[#747474] text-sm w-[100%] ">{t.des}</h6>
  </div>
  <div className="flex justify-between items-center mt-1">
    <span
      className={` ${
        t.priority === "High"
          ? "text-red-500"
          : t.priority === "Medium"
          ? "text-yellow-500"
          : "text-green-500"
      }`}
    >
      {t.priority}
    </span>
    <button
      onClick={(e) => { e.stopPropagation(); deleteHandle(t); }}
      className="text-red-500 text-[11px]"
    >
      Delete
    </button>
  </div>
</div>

      </li>
    ));

  return (
    <div className=" mt-5">
      <h2 className="font-medium text-[15px] flex gap-2 mt-4 text-[#F24E1E]">
        <span>
          <svg
            width="21"
            height="24"
            viewBox="0 0 21 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.33333 24H18.6667C19.9535 24 21 22.9236 21 21.6V3.6C21 2.2764 19.9535 1.2 18.6667 1.2H16.3333C16.3333 0.88174 16.2104 0.576515 15.9916 0.351472C15.7728 0.126428 15.4761 0 15.1667 0H5.83333C5.52391 0 5.22717 0.126428 5.00838 0.351472C4.78958 0.576515 4.66667 0.88174 4.66667 1.2H2.33333C1.0465 1.2 0 2.2764 0 3.6V21.6C0 22.9236 1.0465 24 2.33333 24ZM2.33333 3.6H4.66667V6H16.3333V3.6H18.6667V21.6H2.33333V3.6Z"
              fill="#A1A3AB"
            />
          </svg>
        </span>
        Completed Tasks
      </h2>
      {completedTasks.length === 0 ? (
        <p>No completed tasks</p>
      ) : (
        <ul >{renderTaskList(completedTasks)}</ul>
      )}
    </div>
  );
};

export default Completed;
