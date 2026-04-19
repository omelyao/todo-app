import React, { useState} from "react";
const AddTodo = function({create}){

    const [task, setTask] = useState({text: ''})
    const addNewTask = (e) =>{
    const newTask ={
        ...task, id: Date.now()
    }
    create(newTask)
    setTask({text: ''})
    }
    return(
        <form>
            <input value={task.text}
            onChange ={e => setTask({...task, text: e.target.value})}
            type="text" 
            placeholder="Введите текст задачи" />
        <button type="button" onClick={addNewTask}>Добавить задачу</button>
      </form>
    )
}

export default AddTodo