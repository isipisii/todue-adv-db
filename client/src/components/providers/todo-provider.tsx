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
}

const initialState: TTodoProviderState = {
    todos: [],
    setTodos: () => null
}

const TodoProviderContext = createContext<TTodoProviderState>(initialState)

export function TodoProvider({ children }: TTodoProviderProps) {
    const [todos, setTodos] = useState<TTodo[]>([])

    useEffect(() => {
        async function getTodos(){
            try {
                const todos = await fetchTodos()
                setTodos(todos)
            } catch (error) {
                console.log(error)
            }
        }
        getTodos()
    },[])

  return (
    <TodoProviderContext.Provider value={{ todos, setTodos}}>
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