import Todo from "./todo";
import { useTodo } from "./providers/todo-provider";
import CreateTodoDialog from "./create-todo-dialog";
import { Skeleton } from "./ui/skeleton";

function Todos() {
  const { todos, isTodosLoading } = useTodo();

  return (
    <div className="flex flex-col gap-4 rounded-lg p-4 w-full max-w-[600px]">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-medium">Todue</h2>
        <CreateTodoDialog />
      </div>
      <div className="overflow-y-auto max-h-[400px]">
        {isTodosLoading ? (
          <div className="flex gap-2 flex-col">
            {[...new Array(3)].map((_, index) => (
              <div className="p-4 rounded-lg border space-y-3">
                <Skeleton className="w-[30%] h-[1.125rem] rounded-md" key={index} />
                <Skeleton className="w-[50%] h-[0.75rem] rounded-md" key={index} />
              </div>
            ))}
          </div>
        ) : todos.length ? (
          <div className="flex gap-2 flex-col">
            {todos?.map((todo, index) => (
              <Todo key={index} todo={todo} />
            ))}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center h-[100px]">
            <p className="opacity-[.3]">No to-dos yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todos;
