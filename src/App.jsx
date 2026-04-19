import { useState } from 'react'
import Header from './components/Header/Header'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

function App() {

  const[tasks, setTasks] = useState([
    {id:1, text: 'Джаваскриптик', completed: false, createdAt: Date.now()},
    {id:2, text: 'Джаваскриптик', completed: false, createdAt: Date.now()},
    {id:3, text: 'Джаваскриптик', completed: false, createdAt: Date.now()},
  ])

  const createTask =(newTask) =>{
    setTasks([...tasks, newTask])
  }

  return ( 
    <>
    <Header />
      <section id="center">
        <TodoList create={createTask} tasks={tasks}/>
        <AddTodo create={createTask}/>
      </section>
    </>
  )
}

export default App
