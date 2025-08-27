"use client";
import React from "react";

type Props = {
  title: string;
  des: string;
  priority: "High" | "Medium" | "Low";
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDes: React.Dispatch<React.SetStateAction<string>>;
  setPriority: React.Dispatch<React.SetStateAction<"High" | "Medium" | "Low">>;
  submitHandler: (e: React.FormEvent) => void;
  message: string;
  editTask: number | null;
};

const TaskForm: React.FC<Props> = ({
  title,
  des,
  priority,
  setTitle,
  setDes,
  setPriority,
  submitHandler,
  message,
  editTask,
}) => {
  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-3 mt-4">
      <input
        type="text"
        placeholder="Add task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className=" border-[#A1A3AB] rounded-[6px] w-full h-[37px] px-4"
      />
      <input
        type="text"
        placeholder="Enter description"
        value={des}
        onChange={(e) => setDes(e.target.value)}
        className="border-[#A1A3AB] rounded-[6px] w-full h-[37px] px-4"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
        className="border-[#A1A3AB] rounded-[6px] w-full h-[37px] px-4"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      {message && <p className="text-red-500">{message}</p>}
      <button className="w-full bg-[#F24E1E] hover:bg-[#FF6767] h-[34px] flex justify-center items-center rounded-md  text-white text-sm font-medium ">
        {editTask !== null ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
