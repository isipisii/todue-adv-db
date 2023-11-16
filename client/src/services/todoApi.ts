import { TTodoForm } from "@/components/todo-form"

export async function fetchTodos(): Promise<TTodo[]> {
    const response = await fetch("http://localhost:8000/todo")

    const data = await response.json()
    const todos: TTodo[] = data.data
    
    return todos
}

export async function deleteTodo(todoId: string) {
    const response = await fetch(`http://localhost:8000/todo/${todoId}/delete`, {
        method: "DELETE"
    })
    const data = response

    return data
}

export async function updateTodo(todoDetails: Partial<TTodoForm & { completed?: boolean }>, todoId: string): Promise<TTodo> {
    const response = await fetch(`http://localhost:8000/todo/${todoId}/update`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(todoDetails)
    })

    const data = await response.json()
    const todo: TTodo = data.data
    
    return todo
}

export async function createTodo(todoDetails: TTodoForm) {
    const response = await fetch(`http://localhost:8000/todo`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(todoDetails)
    })

    const data = await response.json()
    const newTodo: TTodo = data.data

    return newTodo
}
