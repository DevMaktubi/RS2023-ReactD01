import Clipboard from "../../components/Clipboard";
import Logo from "../../components/Logo";
import { PlusCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { Task } from "../../components/Task";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  usePublishTaskMutation,
  useToggleTaskDoneMutation,
} from "../../graphql/generated";

interface Task {
  id: string;
  done: boolean;
  title: string;
}

export function Homepage() {
  const { data, refetch } = useGetTasksQuery();
  const [publishTask, {}] = usePublishTaskMutation({
    onCompleted(data) {
      refetch();
    },
  });
  const [createTask, { loading: loadingCreateTask }] = useCreateTaskMutation({
    onCompleted(data, clientOptions) {
      if (data.createTask) {
        publishTask({ variables: { id: data.createTask.id } });
      }
    },
  });

  const [title, setTitle] = useState("");

  const handleCheckTask = ({ id, done }: { id: string; done: boolean }) => {
    publishTask({ variables: { id } });
  };

  const handleAddTask = async () => {
    if (title.length < 4) {
      return;
    }
    await createTask({
      variables: {
        title,
      },
    });
  };

  if (!data) {
    return <h1>Perai</h1>;
  }

  return (
    <div className="min-h-screen flex  flex-col items-center">
      <div className="w-full flex justify-center items-center bg-gray-700 h-52">
        <Logo />
      </div>
      <div className="w-full max-w-[736px] flex flex-col mx-auto items-center -my-7">
        <div className="flex w-full h-14 justify-between">
          <input
            className="rounded placeholder-gray-300 py-2 px-4 flex flex-1 bg-gray-500 border border-gray-700 mr-2 outline-none focus:border-purple-dark"
            placeholder="Adicione uma nova tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="rounded bg-blue-dark text-gray-100 flex items-center justify-center min-w-[90px] font-bold text-sm hover:bg-blue transition-colors"
            onClick={() => handleAddTask()}
            disabled={loadingCreateTask}
          >
            Criar
            <PlusCircle className="ml-1" size={20} />
          </button>
        </div>
        <div className="mt-16 flex w-full justify-between items-start">
          <div className="flex items-center ">
            <strong className="text-blue text-sm mr-2">Tarefas criadas</strong>
            <span className="rounded-full bg-gray-400 text-center text-xs py-1 px-2">
              {data.tasks.length ?? 0}
            </span>
          </div>
          <div className="flex items-center ">
            <strong className="text-purple-dark text-sm mr-2">
              Concluídas
            </strong>
            <span className="rounded-full bg-gray-400 text-center text-xs py-1 px-2">
              {data.tasks.length > 0
                ? data.tasks.filter((t) => t.done === true).length +
                  " de " +
                  data.tasks.length
                : 0}
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full mb-10">
          {data.tasks.length <= 0 && (
            <>
              <div className="w-full rounded-lg border-t border-t-gray-400 mt-6 h-2" />
              <div className="flex flex-col justify-center items-center mt-2 h-64">
                <Clipboard />
                <strong className="text-gray-300">
                  Você ainda não tem tarefas cadastradas
                </strong>
                <p className="text-gray-300">
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
            </>
          )}
          {data.tasks.length > 0 &&
            data.tasks.map((t) => (
              <Task
                key={t.id}
                task={{
                  ...t,
                  onDelete: () => refetch(),
                  onCheck: ({ id, done }: { id: string; done: boolean }) =>
                    handleCheckTask({ id, done }),
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
