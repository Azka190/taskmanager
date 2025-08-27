"use client";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import Completed from "./components/Completed";
import { Task } from "./components/types";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css"

import React, { useState , useEffect } from "react";
import TaskStatus from "./components/TaskStatus";

const Page = () => {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [mainTask, setMainTask] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() =>{
    AOS.init({})
  }, [])

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setMainTask(JSON.parse(savedTasks));
    }
  }, []);

  // ✅ Save tasks to localStorage whenever mainTask changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(mainTask));
  }, [mainTask]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !des.trim()) {
      setMessage("Please enter fields");
      return;
    }
    if (editTask !== null) {
      const updatedTasks = [...mainTask];
      updatedTasks[editTask] = {
        title,
        des,
        priority,
        status: mainTask[editTask].status,
      };
      setMainTask(updatedTasks);
      setEditTask(null);
    } else {
      setMainTask([...mainTask, { title, des, priority, status: "Pending" }]);
    }

    setTitle("");
    setDes("");
    setPriority("Medium");
    setMessage("");
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
    setPriority(mainTask[index].priority);
  };

  const toggleStatus = (index: number) => {
    const updatedTasks = [...mainTask];
    updatedTasks[index].status =
      updatedTasks[index].status === "Pending" ? "Completed" : "Pending";
    setMainTask(updatedTasks);
  };

  // Separate pending and completed tasks
  // const pendingTasks = mainTask.filter((t) => t.status === "Pending");
  const completedTasks = mainTask.filter((t) => t.status === "Completed");

  const getIndexForTask = (task: Task) => mainTask.indexOf(task);

  const toggleStatusByTask = (task: Task) => {
    const index = getIndexForTask(task);
    if (index === -1) return;
    toggleStatus(index);
  };

  const editHandleByTask = (task: Task) => {
    const index = getIndexForTask(task);
    if (index === -1) return;
    editHandle(index);
  };

  const deleteHandleByTask = (task: Task) => {
    const index = getIndexForTask(task);
    if (index === -1) return;
    deleteHandle(index);
  };

  return (
    <div className="bg-[#F5F5F5] h-screen pt-10">
      <h1  data-aos="fade-up" data-aos-duration="2000" className="font-medium text-4xl text-center text-black mb-10">
        Task Manager App
      </h1>

      <div data-aos="fade-up" data-aos-duration="3000" className="border border-[#A1A3AB]/[63%] max-w-[958px] mx-auto bg-[#F5F8FF] rounded flex- gap-5">
        <div className="max-w-[906px] mx-auto flex gap-5 p-5">
          <div className="bg-[#F5F8FF] shadow-2xl  rounded-lg p-5 w-[466px]">
            <div className="flex justify-between  items-center">
              <p className="flex gap-1 text-[#FF6767] text-[15px] font-medium">
                <span>
                  <Image
                    src="/img.svg"
                    alt="clip board"
                    width={28.18}
                    height={28.18}
                  />
                </span>
                To-Do
              </p>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowForm(!showForm);
                }}
                className="flex items-center gap-1 text-[#A1A3AB] text-xs"
              >
                <span>
                  <Image
                    src="/plus.svg"
                    alt="clip board"
                    width={10}
                    height={10}
                  />
                </span>
                Add task
              </a>
            </div>
            {showForm && (
              <TaskForm
                title={title}
                des={des}
                priority={priority}
                setTitle={setTitle}
                setDes={setDes}
                setPriority={setPriority}
                submitHandler={submitHandler}
                message={message}
                editTask={editTask}
              />
            )}

            <TaskItem
              tasks={mainTask.filter((t) => t.status === "Pending")}
              toggleStatus={toggleStatusByTask}
              editHandle={editHandleByTask}
              deleteHandle={deleteHandleByTask}
            />
          </div>
          <div>
            <div className="w-[466px] ">
              <div className="bg-[#F5F8FF] mb-4 rounded-lg shadow-2xl p-5 max-w-[436px]">
                <TaskStatus tasks={mainTask} />
              </div>
              <div className="bg-[#F5F8FF] shadow-2xl  rounded-lg p-5 max-w-[436px]">
                <Completed completedTasks={completedTasks} deleteHandle={deleteHandleByTask} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
