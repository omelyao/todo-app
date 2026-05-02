import { useState } from 'react';
import { EditTodo } from './EditTodo';
import { MyInput } from '../../../shared/UI/MyInput';
import { MyButton } from '../../../shared/UI/MyButton';
import { Todo } from '../model/types';

interface TodoItemProps {
  task: Todo;
  updateTask: (id: number, newText: string) => void;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void; // изменить сигнатуру
  number: number;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  updateTask,
  deleteTask,
  number,
  toggleComplete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(task.text);

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
              onChange={() => toggleComplete(task.id)}
            />
            <label>Выполнено</label>
          </div>
          {!isEditing && (
            <>
              <MyButton className="edit" onClick={handleEdit}>
                Редактировать
              </MyButton>
              <MyButton className="delete" onClick={() => deleteTask(task.id)}>
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
