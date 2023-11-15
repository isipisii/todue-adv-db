import { ThemeProvider } from './components/providers/theme-provider';
import { TodoProvider } from './components/providers/todo-provider';
import { ModeToggle } from './components/mode-toggle';
import Todos from './components/todos';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <main className='flex items-center justify-center w-full'>
          <ModeToggle />
          <Todos />
        </main>
      </TodoProvider>
    </ThemeProvider>
  )
}

export default App