import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header/Header'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import SortAndFilterTodo from './components/SortAndFilterTodo'

function App() {

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : [
      {id:1, text: 'Создать список с задачами', completed: false, createdAt: Date.now()},
    ];
  })
  const [filter, setFilter] = useState({
    sortDate: 'newest', 
  });
  

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
  const sortedTasks = useMemo(() => {
    let filtered = [...tasks];

    // Фильтрация по статусу
    if (filter.status === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter.status === 'notCompleted') {
      filtered = filtered.filter(task => !task.completed);
    }
    // Если 'all', фильтрация не нужна, оставляем все задачи

    // Сортировка по дате (или id)
    if (filter.sortDate === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    } else if (filter.sortDate === 'oldest') {
      filtered.sort((a, b) => a.id - b.id);
    }
    return filtered;
  }, [filter.status, filter.sortDate, tasks]);

  return ( 
    <>
    <Header />
      <section id="center">
        <SortAndFilterTodo filter={filter} setFilter={setFilter}/>
        <TodoList updateTask={updateTask} tasks={sortedTasks} deleteTask={deleteTask}toggleComplete={toggleComplete}/>
        <AddTodo create={createTask}/> 
      </section>
    </>
  )
}

export default App
