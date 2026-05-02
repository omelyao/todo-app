import React, { useState } from 'react';
import { MyInput } from '../../../shared/UI/MyInput';
import { MyButton } from '../../../shared/UI/MyButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../model/index';
import { addTaskAsync } from '../model/tasksSlice';

const AddTodo: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const createTask = (task: { text: string }) => {
    try {
      dispatch(addTaskAsync({ text: task.text }));
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  const addNewTask = () => {
    if (task.trim() === '') {
      setError('Поле не может быть пустым');
      return;
    }
    const newTask = {
      text: task,
      id: Date.now()
    };
    createTask(newTask);
    setTask('');
    setError('');
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addNewTask();
      }}
    >
      <MyInput
        value={task}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTask(e.target.value)
        }
        type="text"
        placeholder="Введите текст задачи"
      />
      <MyButton type="button" onClick={addNewTask}>
        Добавить задачу
      </MyButton>
      {error ? <div style={{ color: 'red' }}>{error}</div> : null}
    </form>
  );
};

export { AddTodo };
