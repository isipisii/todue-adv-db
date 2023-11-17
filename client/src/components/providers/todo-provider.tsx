import { 
    useState, 
    useEffect, 
    createContext,
    ReactNode, 
    useContext
} from "react"
import { fetchTodos } from "@/services/todoApi"

type TTodoProviderProps = {
    children: ReactNode
}

type TTodoProviderState = {
    todos: TTodo[]
    setTodos: (todo: TTodo[]) => void
    todoToEdit: TTodo | null
    setTodoToEdit: (todo: TTodo | null) => void
    openEditTodoDialog: boolean
    setOpenEditTodoDialog: (state: boolean) => void
    isTodosLoading: boolean
}

const initialState: TTodoProviderState = {
    todos: [],
    setTodos: () => null,
    todoToEdit: null,
    setTodoToEdit: () => null,
    openEditTodoDialog: false,
    setOpenEditTodoDialog: () => null,
    isTodosLoading: false
}

const TodoProviderContext = createContext<TTodoProviderState>(initialState)

export function TodoProvider({ children }: TTodoProviderProps) {
    const [todos, setTodos] = useState<TTodo[]>([])
    const [isTodosLoading, setIsTodosLoading] = useState(false)
    const [todoToEdit, setTodoToEdit] = useState<TTodo| null>(null)
    const [openEditTodoDialog,  setOpenEditTodoDialog] = useState(false)

    useEffect(() => {
        async function getTodos(){
            try {
                setIsTodosLoading(true)

                const todos = await fetchTodos()
                setTodos(todos)

                setIsTodosLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getTodos()
    },[])

  return (
    <TodoProviderContext.Provider 
        value={{ 
            todos, 
            setTodos, 
            todoToEdit, 
            setTodoToEdit,
            openEditTodoDialog,
            setOpenEditTodoDialog,
            isTodosLoading
        }}
    >
        {children}
    </TodoProviderContext.Provider>
  )
}


export function useTodo() {
    const context = useContext(TodoProviderContext)

    if (context === undefined)
    throw new Error("useTodo must be used within a TodoProvider")

    return context
}