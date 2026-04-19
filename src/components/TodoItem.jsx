import MyInput from "./MyInput/MyInput"


function TodoItem({task, toggleComplete, number}){
    return(
    <div className="task">
        <div className="task__content">
            <div>{number}. {task.text}</div>
            <label className="checkbox-label">
            <MyInput
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="checkbox"
            />
            Выполнено
            </label>
        </div>
    </div>
    )
}

export default TodoItem