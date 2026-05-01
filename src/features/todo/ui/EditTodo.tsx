import React, { useState } from 'react';
import { MyButton } from '../../../shared/components/MyButton';
import { MyTextArea } from '../../../shared/components/MyTextArea';

interface EditTodoProps {
  initialText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({
  initialText,
  onSave,
  onCancel
}) => {
  const [text, setText] = useState<string>(initialText);

  const handleSave = () => {
    onSave(text);
  };

  return (
    <>
      <MyTextArea
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
      />
      <MyButton onClick={handleSave}>Сохранить</MyButton>
      <MyButton onClick={onCancel}>Отмена</MyButton>
    </>
  );
};

export { EditTodo };
