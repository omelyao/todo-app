import React, { useState } from 'react';
import MyButton from './MyButton/MyButton';
import MyInput from './MyInput/MyInput';

function EditTodo({ initialText, onSave, onCancel }) {
  const [text, setText] = useState(initialText);

  const handleSave = () => {
    onSave(text);
  };

  return (
    <div>
      <MyInput
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <MyButton onClick={handleSave}>Сохранить</MyButton>
      <MyButton onClick={onCancel}>Отмена</MyButton>
    </div>
  );
}

export default EditTodo;