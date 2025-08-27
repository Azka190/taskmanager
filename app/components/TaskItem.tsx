import { Task } from "./types";

type Props = {
  tasks: Task[];
  toggleStatus: (task: Task) => void;
  editHandle: (task: Task) => void;
  deleteHandle: (task: Task) => void;
};

const TaskItem: React.FC<Props> = ({
  tasks,
  toggleStatus,
  editHandle,
  deleteHandle,
}) => {
  const renderTaskList = (tasks: Task[]) =>
    tasks.map((t, i) => (
      <li key={i} className="border border-[#A1A3AB] rounded-[14px] w-full px-4 mb-2 p-3 overflow-hidden">
        <div
          className={`flex flex-col gap-1 cursor-pointer ${
            t.status === "Completed" ? "line-through text-gray-500" : ""
          }`}
          onClick={() => toggleStatus(t)}
        >
          <div>
            <h5 className="text-base font-semibold">{t.title}</h5>
            <h6 className="text-[#747474] text-sm w-[100%]">{t.des}</h6>
          </div>
          <div className="flex justify-between">
            <h4 className="flex text-[13px] font-medium gap-2">
              priority:
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
            </h4>
            <div className="flex gap-2">
              <button onClick={(e) => { e.stopPropagation(); editHandle(t); }} className="text-green-500 text-[11px]">
                Edit
              </button>
              <button onClick={(e) => { e.stopPropagation(); deleteHandle(t); }} className="text-red-500 text-[11px]">
                Delete
              </button>
            </div>
          </div>
        </div>
      </li>
    ));

  return (
    <div className="mt-4">
      {tasks.length === 0 ? <p>No tasks</p> : <ul>{renderTaskList(tasks)}</ul>}
    </div>
  );
};

export default TaskItem;