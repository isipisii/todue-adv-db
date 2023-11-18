import { ModeToggle } from './components/mode-toggle';
import EditTodoDialog from './components/edit-todo-dialog';
import Todos from './components/todos';
import TodoPercentage from './components/todo-percentage';
import { useTodo } from './components/providers/todo-provider';
import { Toaster } from 'sonner';

function App() {
  const { todos } = useTodo()

  return (
    <main className='flex items-center justify-center w-full h-screen gap-4 md:flex-row flex-col'>
      <Toaster 
        richColors 
        position="bottom-right"
        expand={true}
      />
      <EditTodoDialog />
      <ModeToggle />
      <Todos /> 
      {todos.length > 0 && <TodoPercentage />}
    </main>
  )
}

export default App