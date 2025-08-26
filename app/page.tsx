"use client";

import React, { useState } from "react";

type Task = {
  title: string;
  des: string;
  priority: "High" | "Medium" | "Low";

};

const Page = () => {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [mainTask, setMainTask] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<number | null>(null);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (editTask !== null) {
      // ✅ Update existing task
      const updatedTasks = [...mainTask];
      updatedTasks[editTask] = { title, des , priority };
      setMainTask(updatedTasks);
      setEditTask(null);
    } else {
      // ✅ Add new task
      setMainTask([...mainTask, { title, des , priority }]);
    }

    setTitle("");
    setDes("");
    setPriority("Medium");
  };

  const deleteHandle = (i: number) => {
    const copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  
    if (editTask === i) {
      setEditTask(null);
      setTitle("");
      setDes("");
      setPriority("Medium");
    }
  };
  

  const editHandle = (index: number) => {
    setEditTask(index);
    setTitle(mainTask[index].title);
    setDes(mainTask[index].des);
  };

  let renderTask: JSX.Element | JSX.Element[] = <h2>No task available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li key={i} className="flex gap-10 items-center">
        <div className="flex flex-col gap-1">
          <h5 className="font-bold">{t.title}</h5>
          <h6>{t.des}</h6>
        </div>

        <span
      className={`px-2 py-1 rounded text-white ${
        t.priority === "High"
          ? "bg-red-500"
          : t.priority === "Medium"
          ? "bg-yellow-500"
          : "bg-green-500"
      }`}
    >
      {t.priority}
    </span>


        <button
          onClick={() => editHandle(i)}
          className="px-2 py-1 bg-yellow-400 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => deleteHandle(i)}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </li>
    ));
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-bold w-full text-center">
          Task Manager App
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="add task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl border-2 border-zinc-800 px-2"
          />
          <input
            type="text"
            placeholder="enter description"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            className="text-2xl border-2 border-zinc-800 px-2"
          />

<select
  value={priority}
  onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
  className="text-2xl border-2 border-zinc-800 px-2"
>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
</select>
          <button className="w-[300px] h-[30px] border-2 border-zinc-800">
            {editTask !== null ? "Update Task" : "Add Task"}
          </button>
        </form>

        <div className="p-8 bg-slate-200">
          <ul>{renderTask}</ul>
        </div>
      </div>
    </>
  );
};

export default Page;
