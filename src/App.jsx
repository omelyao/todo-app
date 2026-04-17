import { useState } from 'react'
import Header from './components/Header/Header'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

function App() {
  const [count, setCount] = useState(0)

  return ( 
    <>
    <Header />
      <section id="center">
        <TodoList />
        <AddTodo />
      </section>
    </>
  )
}

export default App
