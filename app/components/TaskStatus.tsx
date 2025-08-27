"use client";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Task } from "./types";

type Props = {
  tasks: Task[];
};

const COLORS = {
  Completed: "#22c55e",
  "In Progress": "#2563eb", 
};

const TaskStatus: React.FC<Props> = ({ tasks }) => {
  const total = tasks.length || 1;

  const completed = tasks.filter((t) => t.status === "Completed").length;
  const inProgress = tasks.filter((t) => t.status === "Pending").length;

  const data = [
    { name: "Completed", value: Math.round((completed / total) * 100) },
    { name: "In Progress", value: Math.round((inProgress / total) * 100) },
  ];

  return (
    <div className="">
      <h2 className="font-medium text-[15px] text-[#F24E1E] mb-4 flex gap-2 items-center">
        Task Status
      </h2>

      <div className="flex justify-around">
        {data.map((entry, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div style={{ width: 80, height: 80 }}>
              <CircularProgressbar
                value={entry.value}
                text={`${entry.value}%`}
                styles={buildStyles({
                  pathColor: COLORS[entry.name as keyof typeof COLORS],
                  textColor: "#111",
                  trailColor: "#E5E7EB",
                })}
              />
            </div>
            <p className="flex items-center gap-1 text-sm">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: COLORS[entry.name as keyof typeof COLORS] }}
              ></span>
              {entry.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatus;
