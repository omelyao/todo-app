import TodoItem from './TodoItem'

function TodoList({tasks, toggleComplete, deleteTask, updateTask}){
    console.log(tasks)
    return(
        <div>
            {tasks.map((task,index)=>
                <TodoItem number={index + 1}
                deleteTask={deleteTask}
                updateTask={updateTask}
                task = {task} 
                key={task.id}
                toggleComplete={toggleComplete}
                />
            )}
        </div>
    )
}

export default TodoList