import Todo from "./todo"
import { useTodo } from "./providers/todo-provider"
import CreateTodoDialog from "./create-todo-dialog"

function Todos() {
  const { todos } = useTodo()
  return (
    <div className="flex flex-col gap-4 rounded-lg p-4 w-full max-w-[600px]">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-2xl font-medium">Todue</h2>
          <CreateTodoDialog />
        </div>
        <div className="overflow-y-auto max-h-[400px]">
            <div className="flex gap-2 flex-col">
                {todos?.map((todo, index) => (
                    <Todo key={index} todo={todo} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Todos