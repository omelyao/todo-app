import TodoItem from './TodoItem'

function TodoList({tasks, index}){

    
    return(
        <div>
            {tasks.map((task,index)=>
                <TodoItem number={index + 1}task = {task} key={task.id}/>
            )}
        </div>
    )
}

export default TodoList