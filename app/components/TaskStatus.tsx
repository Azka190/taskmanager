"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Task } from "./types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  tasks: Task[];
};

const COLORS = {
  Completed: "#22c55e",
  "In Progress": "#2563eb",
};

const TaskStatus: React.FC<Props> = ({ tasks }) => {
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const inProgress = tasks.filter((t) => t.status === "Pending").length;

  const data = {
    labels: ["Completed", "In Progress"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, inProgress],
        backgroundColor: [COLORS.Completed, COLORS["In Progress"]],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { 
          color: "#374151", 
          font: { size: 12 } as const 
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#E5E7EB" },
        ticks: { 
          color: "#374151", 
          stepSize: 1, 
          font: { size: 12 } as const 
        },
      },
    },
    datasets: {
      bar: {
          barPercentage: 1.9,   // 🔹 thinner bars
          categoryPercentage: 0.3, // 🔹 more spacing
      },
    },
   
  };
  
  return (
    <div className=" ">
      <h2 className="font-medium text-[15px] text-[#F24E1E] mb-3">Task Status</h2>
      <div style={{ height: "170px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TaskStatus;
