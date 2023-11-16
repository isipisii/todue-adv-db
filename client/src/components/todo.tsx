import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Checkbox } from "./ui/checkbox"
import { LayoutList } from 'lucide-react';
import TodoDropdown from "./todo-dropdown";
import { useTodo } from "./providers/todo-provider";
import { updateTodo } from "@/services/todoApi";

function Todo({ todo }: {todo: TTodo}) {
  const { todos, setTodos } = useTodo()

  function handleDoneTask(todoId: string) {
    if(todo.completed) {
      const updatedArr = todos.map(todo => todo._id === todoId ? {...todo, completed: false} : todo)
      handleComplete(todoId, false)
      setTodos(updatedArr)
    } else {
      const updatedArr = todos.map(todo => todo._id === todoId ? {...todo, completed: true} : todo)
      handleComplete(todoId, true)
      setTodos(updatedArr)
    }
  }

  async function handleComplete(todoId: string, isComplete: boolean) {
    try {
      await updateTodo({ completed: isComplete }, todoId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className="w-full flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
            <LayoutList className="text-[1.5rem]" />
            <CardHeader className="p-0">
                <CardTitle className={`text-lg ${todo.completed ? "line-through" : null}`}>{todo.title}</CardTitle>
                <CardDescription className={`text-xs ${todo.completed ? "line-through" : null}`}>{todo.description}</CardDescription>
            </CardHeader>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <TodoDropdown todo={todo}/>
          <Checkbox checked={todo.completed} onClick={() => handleDoneTask(todo._id)}/>
        </div>
    </Card>
  )
}

export default Todo