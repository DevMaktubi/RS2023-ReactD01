import classNames from "classnames";
import { Check, Trash } from "phosphor-react";

interface ChoreProps {
  task: {
    id: string;
    done: boolean;
    title: string;
    onDelete: (id: string) => void;
    onCheck: (id: string) => void;
  };
}

export function Task({
  task: { id, title, done, onDelete, onCheck },
}: ChoreProps) {
  return (
    <div className="bg-gray-500 border border-gray-400 rounded px-2 py-4 flex w-full justify-around items-start mt-6">
      <div className="">
        <div
          className={classNames(
            "rounded-full h-5 w-5 bg-gray-500 cursor-pointer flex items-center justify-center transition-colors",
            {
              "ring-none bg-purple-dark hover:bg-purple": done,
              "ring-2 ring-blue hover:bg-blue-dark ": !done,
            }
          )}
          onClick={() => onCheck(id)}
        >
          <Check size={16} className={!done ? "hidden" : ""} />
        </div>

        <input
          id="checkbox"
          type="checkbox"
          checked={done}
          className="hidden"
        />
      </div>
      <p
        className={classNames(
          "text-sm text-start max-w-xl flex transition-all flex-1",
          {
            "line-through text-gray-300": done,
          }
        )}
      >
        {title}
      </p>
      <button
        className="flex items-center justify-center text-gray-300 hover:bg-gray-400 group transition-colors"
        onClick={() => onDelete(id)}
      >
        <Trash
          className="group-hover:text-danger transition-colors p-1"
          size={32}
        />
      </button>
    </div>
  );
}
