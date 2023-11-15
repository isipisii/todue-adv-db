
export async function fetchTodos(): Promise<TTodo[]> {
    const response = await fetch("http://localhost:8000/todo")

    const data = await response.json()
    const todos: TTodo[] = data.data
    
    return todos
}

export async function deleteTodo(todoId: string): Promise<void> {
    const response = await fetch(`http://localhost:8000/todo/${todoId}/delete`, {
        method: "DELETE"
    })
    const data = await response.json()

    return data
}

export async function updateTodo(todoDetails: TTodo, todoId: string): Promise<TTodo> {
    const response = await fetch(`http://localhost:8000/todo/${todoId}/update`, {
        method: "PATCH",
        body: JSON.stringify(todoDetails)
    })

    const data = await response.json()
    const todo: TTodo = data.data

    return todo
}

export async function createTodo(todoDetails: TTodo): Promise<TTodo> {
    const response = await fetch(`http://localhost:8000/todo`, {
        method: "POST",
        body: JSON.stringify(todoDetails)
    })

    const data = await response.json()
    const todo: TTodo = data.data

    return todo
}