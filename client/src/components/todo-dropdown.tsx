import { MoreHorizontal, Trash2, Pencil} from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTodo } from './providers/todo-provider';
import { deleteTodo } from '@/services/todoApi';

export default function TodoDropdown({ todo }: {todo: TTodo}) {
    const { setOpenEditTodoDialog, setTodoToEdit, todos, setTodos } = useTodo()
    
    async function handleDeleteTodo(todoId: string) {
        try {
            await deleteTodo(todoId)
            const updatedTodoArr = todos.filter(todo => todo._id !== todoId)

            setTodos(updatedTodoArr)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='p-0'>
                <Button variant="link" size="sm" className='h-4'>
                    <MoreHorizontal className='text-xs'/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                    setTodoToEdit(todo)
                    setOpenEditTodoDialog(true)
                }}>
                    <Pencil className="w-4 h-4 mr-3" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem className='!text-red-500' onClick={() => handleDeleteTodo(todo._id)}>
                    <Trash2 className="w-4 h-4 mr-3" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}