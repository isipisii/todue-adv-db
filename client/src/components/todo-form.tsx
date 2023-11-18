import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";

import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

import { useTodo } from "./providers/todo-provider";
import { createTodo, updateTodo } from "@/services/todoApi";
import { toast } from 'sonner'

const todoFormSchema = z.object({
    title: z.string({
        required_error: "To-do title is required",
        invalid_type_error: "Name must be a string",
    }).max(20, {
        message: "To-do title should not exceed to 20 characters"
    }).refine(data => data.trim().length > 0, {
        message: "To-do title is required"
    }),
    description: z.string().max(100, {
        message: "To-do description should not exceed 100 characters"
    }).refine(data => data.trim().length > 0, {
        message: "To-do description is required"
    })
})

export type TTodoForm = z.infer<typeof todoFormSchema>

function TodoForm({ isEditing, setOpen }: { isEditing?: boolean, setOpen: (atate: boolean) => void }) {
    const { todos, setTodos, todoToEdit, setTodoToEdit } = useTodo()
    const form = useForm<TTodoForm>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: {
            title: isEditing ? todoToEdit?.title : "",
            description: isEditing ? todoToEdit?.description : ""
        },
    })
    
    async function onSubmitCreateTodo(values: TTodoForm) {
        try {
            const newTodo = await createTodo(values)
            setTodos([...todos, newTodo])

            //this will close the specific dialog from where its mounted
            setOpen(false)
            toast.success("To-do created.")
        } catch (error) {
            toast.error("Creating to-do failed")
            console.error(error)
        }
    }    

    async function onSubmitEditTodo(values: TTodoForm) {
        try {
            if(!todoToEdit) return

            const updatedTodo = await updateTodo(values, todoToEdit._id)
            const updatedTodoArr = todos.map(todo => todo._id === updatedTodo._id ? {...updatedTodo} : todo)
            
            setTodos(updatedTodoArr)
             //this will close the specific dialog from where its mounted
            setTodoToEdit(null)
            setOpen(false)
            toast.success("To-do updated.")
        } catch (error) {
            toast.error("Updating to-do failed")
            console.error(error)
        }
    }    

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(isEditing ? onSubmitEditTodo : onSubmitCreateTodo)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Put your to-do title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Input placeholder="Put your to-do description" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">{isEditing ? "Save changes" : "Add"}</Button>
            </form>
        </Form>
    )
}

export default TodoForm