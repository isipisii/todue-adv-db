import { useTodo } from "./providers/todo-provider"
import { Progress } from "./ui/progress"

export default function TodoPercentage() {
    const { todos } = useTodo()
    const totalTodos = todos.length
    const completedTodosLength = todos.filter(todo => todo.completed).length
    const incompleteTodoLength = todos.filter(todo => !todo.completed).length
    const completePercentage = Math.round((completedTodosLength / totalTodos) * 100) || 0
    const incompletePercentage = Math.round((incompleteTodoLength / totalTodos) * 100) || 0

    return (
        <div className="space-y-4 w-full md:w-[40%] p-4">
            <div className="grid gap-4"> 
                <div className="flex items-center justify-between">
                    <p>Completed</p>
                    <p>{completePercentage}%</p>
                </div>
                <Progress value={completePercentage}/>
            </div>
            <div className="grid gap-4">
                <div className="flex items-center justify-between">
                    <p>To-do</p>
                    <p>{incompletePercentage}%</p>
                </div>
                <Progress value={incompletePercentage}/>
            </div>
        </div>
    )
}
