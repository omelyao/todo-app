import { useState } from 'react';
import { EditTodo } from './EditTodo';
import { MyInput } from '../../../shared/UI/MyInput';
import { MyButton } from '../../../shared/UI/MyButton';
import { Todo } from '../model/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/index';
import {
  deleteTaskAsync,
  updateTaskAsync,
  toggleTaskAsync
} from '../model/todoSlice';
interface TodoItemProps {
  task: Todo;
  number: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(task.text);

  const deleteTask = (id: number) => {
    dispatch(deleteTaskAsync(id));
  };
  // Обновить задачу
  const updateTask = (id: number, newText: string) => {
    dispatch(updateTaskAsync({ id, text: newText }));
  };

  // Переключить завершенность
  const toggleCompleteTask = (id: number) => {
    dispatch(toggleTaskAsync(id));
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newText: string) => {
    updateTask(task.id, newText);
    setTaskText(newText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleDelete = () => deleteTask(task.id);
  return (
    <li className="task">
      <div className="task__content">
        {/* Левая часть: номер и текст */}
        <div className="task__left">
          <span className="task__number">{number}. </span>
          {isEditing ? (
            <EditTodo
              initialText={taskText}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <span className="task__text">{taskText}</span>
          )}
        </div>
        {/* Правая часть: чекбокс и кнопки */}
        <div className="task__right">
          <div className="task__checkbox">
            <MyInput
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleteTask(task.id)}
            />
            <label>Выполнено</label>
          </div>
          {!isEditing && (
            <>
              <MyButton className="edit" onClick={handleEdit}>
                Редактировать
              </MyButton>
              <MyButton className="delete" onClick={handleDelete}>
                Удалить
              </MyButton>
            </>
          )}
        </div>
      </div>
    </li>
  );
};
export { TodoItem };
