import React, { useState } from 'react';
import MyButton from './MyButton/MyButton';
import MyInput from './MyInput/MyInput';
import { Todo, EditTodoProps } from '../types';

const EditTodo: React.FC<EditTodoProps> = ({ initialText, onSave, onCancel }) => {
  const [text, setText] = useState<string>(initialText);

  const handleSave = () => {
    onSave(text);
  };

  return (
    <div>
      <MyInput
        type="text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <MyButton onClick={handleSave}>Сохранить</MyButton>
      <MyButton onClick={onCancel}>Отмена</MyButton>
    </div>
  );
};

export default EditTodo;