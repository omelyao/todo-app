import React, { useState} from "react";
import MyInput from "./MyInput/MyInput";
import MyButton from "./MyButton/MyButton";
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
            <MyInput value={task.text}
            onChange ={e => setTask({...task, text: e.target.value})}
            type="text" 
            placeholder="Введите текст задачи" />
        <MyButton type="button" onClick={addNewTask}>Добавить задачу</MyButton>
      </form>
    )
}

export default AddTodo