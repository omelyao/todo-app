import TodoItem from './TodoItem'

function TodoList({tasks, toggleComplete}){
    console.log(tasks)
    return(
        <div>
            {tasks.map((task,index)=>
                <TodoItem number={index + 1}
                task = {task} 
                key={task.id}
                toggleComplete={toggleComplete}
                />
            )}
        </div>
    )
}

export default TodoList