import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Checkbox } from "./ui/checkbox"
import { LayoutList } from 'lucide-react';
import TodoDropdown from "./todo-dropdown";

function Todo({ todo }: {todo: TTodo}) {
  return (
    <Card className="w-full flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
            <LayoutList className="text-[1.5rem]" />
            <CardHeader className="p-0">
                <CardTitle className="text-lg">{todo.title}</CardTitle>
                <CardDescription className="text-xs">{todo.description}</CardDescription>
            </CardHeader>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <TodoDropdown todo={todo}/>
          <Checkbox/>
        </div>
    </Card>
  )
}

export default Todo