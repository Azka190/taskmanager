export type Task = {
    title: string;
    des: string;
    priority: "High" | "Medium" | "Low";
    status: "Pending" | "Completed";
  };