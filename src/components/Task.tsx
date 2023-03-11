import classNames from "classnames";
import { Check, Trash } from "phosphor-react";
import {
  useDeleteTaskMutation,
  useToggleTaskDoneMutation,
} from "../graphql/generated";

interface ChoreProps {
  task: {
    id: string;
    done: boolean;
    title: string;
    onDelete: () => void;
    onCheck: ({ id, done }: { id: string; done: boolean }) => void;
  };
}

export function Task({
  task: { id, title, done, onDelete, onCheck },
}: ChoreProps) {
  const [deleteTask, { loading: loadingDeleteTask }] = useDeleteTaskMutation({
    onCompleted() {
      onDelete();
    },
  });
  const [toggleTaskDone, { loading: loadingToggleTaskDone }] =
    useToggleTaskDoneMutation({
      onCompleted({ updateTask }) {
        if (updateTask) {
          onCheck({ id: updateTask?.id, done: updateTask.done });
        }
      },
    });

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
          onClick={() => toggleTaskDone({ variables: { id, done: !done } })}
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
        disabled={loadingDeleteTask}
        onClick={() => deleteTask({ variables: { id } })}
      >
        <Trash
          className="group-hover:text-danger transition-colors p-1"
          size={32}
        />
      </button>
    </div>
  );
}
