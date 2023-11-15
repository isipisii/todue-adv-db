import Todo from "./todo"
import { useTodo } from "./providers/todo-provider"

function Todos() {
    const { todos } = useTodo()

    console.log(todos)
  return (
    <div className="flex flex-col gap-4 rounded-lg p-4 w-full max-w-[600px]">
        <h2 className="text-2xl font-medium">Todue</h2>
        <div className="overflow-y-auto max-h-[400px]">
            <div className="flex gap-2 flex-col">
                {[... new Array(10)].map((_, index) => (
                    <Todo key={index} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Todos