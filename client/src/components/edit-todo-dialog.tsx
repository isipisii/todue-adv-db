// import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
//   DialogTrigger,
} from "@/components/ui/dialog"

import TodoForm from "./todo-form"
import { useTodo } from "./providers/todo-provider"

export default function EditTodoDialog() {
    const { openEditTodoDialog ,setOpenEditTodoDialog } = useTodo()

    return (
        <Dialog open={openEditTodoDialog} onOpenChange={setOpenEditTodoDialog}>
          {/* <DialogTrigger asChild>
            <Button variant="outline">Create to-do</Button>
          </DialogTrigger> */}
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit to-do</DialogTitle>
              <DialogDescription>
                Make changes to you to-do
              </DialogDescription>
            </DialogHeader>
            <TodoForm setOpen={setOpenEditTodoDialog} isEditing={true} />
          </DialogContent>
        </Dialog>
      )
}
