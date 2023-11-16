// import { Input } from "./ui/input"

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import TodoForm from "./todo-form"
import { useState } from "react";

export default function CreateTodoDialog() {
  const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Create to-do</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add to-do</DialogTitle>
              <DialogDescription>
                Make your day productive
              </DialogDescription>
            </DialogHeader>
            <TodoForm setOpen={setOpen}/>
          </DialogContent>
        </Dialog>
      )
}
