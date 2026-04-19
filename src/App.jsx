import { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

function App() {

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : [
      {id:1, text: 'Создать список с задачами', completed: false, createdAt: Date.now()},
    ];
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const createTask =(newTask) =>{
    setTasks([...tasks, newTask])
  }
  const deleteTask = (id) => {
    setTasks(tasks.filter(p => p.id !== id));
  } 

  const updateTask = (id, newText) => {
  setTasks(tasks.map(task => 
    task.id === id ? { ...task, text: newText } : task
  ));
};
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return ( 
    <>
    <Header />
      <section id="center">
        <TodoList updateTask={updateTask} tasks={tasks} deleteTask={deleteTask}toggleComplete={toggleComplete}/>
        <AddTodo create={createTask}/> 
      </section>
    </>
  )
}

export default App
