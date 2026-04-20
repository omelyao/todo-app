import React, { useState} from "react";
import MyInput from "./MyInput/MyInput";
import MyButton from "./MyButton/MyButton";
const AddTodo = function({create}){

    const [task, setTask] = useState({text: ''})
    const [error, setError] = useState('');
    const addNewTask = (e) =>{
    if (task.text === '') {
        setError('Поле не может быть пустым');
        return;
    }
    const newTask ={
        ...task, id: Date.now()
    }
    create(newTask)
    setTask({text: ''})
    setError('');
    }
    return(
        <form>
            <MyInput value={task.text}
            onChange ={e => setTask({...task, text: e.target.value})}
            type="text" 
            placeholder="Введите текст задачи" />
        <MyButton type="button" onClick={addNewTask}>Добавить задачу</MyButton>
        {error ? <div style={{ color: 'red' }}>{error}</div> : null}
      </form>
    )
}

export default AddTodo