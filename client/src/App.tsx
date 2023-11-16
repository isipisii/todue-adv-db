import { ModeToggle } from './components/mode-toggle';
import EditTodoDialog from './components/edit-todo-dialog';
import Todos from './components/todos';

function App() {
  return (
    <main className='flex items-center justify-center w-full'>
      <EditTodoDialog />
      <ModeToggle />
      <Todos />
    </main>
  )
}

export default App