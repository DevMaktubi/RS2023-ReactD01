import Clipboard from "./components/Clipboard";
import Logo from "./components/Logo";
import { Check, PlusCircle, Trash } from "phosphor-react";
import { useState } from "react";
import { Task } from "./components/Task";

interface Task {
  id: string;
  done: boolean;
  title: string;
}

function App() {
  const hasTasks = true;

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task1",
      done: false,
      title: "Tarefa 1",
    },
    {
      id: "task2",
      done: false,
      title: "Tarefa 2",
    },
    {
      id: "task3",
      done: false,
      title: "Tarefa 3",
    },
    {
      id: "task4",
      done: true,
      title: "Tarefa 4",
    },
    {
      id: "task5",
      done: true,
      title: "Tarefa 5",
    },
  ]);

  const handleDeleteTask = (id: string) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
  };

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
          />
          <button className="rounded bg-blue-dark text-gray-100 flex items-center justify-center min-w-[90px] font-bold text-sm hover:bg-blue transition-colors">
            Criar
            <PlusCircle className="ml-1" size={20} />
          </button>
        </div>
        <div className="mt-16 flex w-full justify-between items-start">
          <div className="flex items-center ">
            <strong className="text-blue text-sm mr-2">Tarefas criadas</strong>
            <span className="rounded-full bg-gray-400 text-center text-xs py-1 px-2">
              0
            </span>
          </div>
          <div className="flex items-center ">
            <strong className="text-purple-dark text-sm mr-2">
              Concluídas
            </strong>
            <span className="rounded-full bg-gray-400 text-center text-xs py-1 px-2">
              0
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full">
          {!hasTasks && (
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
          {hasTasks &&
            tasks.map((t) => (
              <Task
                key={t.id}
                task={{ ...t, onDelete: (id: string) => handleDeleteTask(id) }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;