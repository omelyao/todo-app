

function TodoItem(props){
    return(
        
    <div className="task">
        <div className="task__content">
            <div>{props.number}. {props.task.text}</div>
            <div>
                <div>Статус: </div>
                <div>{props.task.completed ? 'Выполнено' : 'Не выполнено'}</div>
            </div>
        </div>
    </div>
    )
}

export default TodoItem