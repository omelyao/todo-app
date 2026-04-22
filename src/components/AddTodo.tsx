import React, { useState } from "react";
import { MyInput } from "./MyInput/MyInput";
import { MyButton } from "./MyButton/MyButton";
import { AddTodoProps } from "../types";

const AddTodo: React.FC<AddTodoProps> = ({ create }) => {
  const [task, setTask] = useState<{ text: string }>({ text: "" });
  const [error, setError] = useState<string>("");

  const addNewTask = () => {
    if (task.text.trim() === "") {
      setError("Поле не может быть пустым");
      return;
    }
    const newTask = {
      ...task,
      id: Date.now(),
    };
    create(newTask);
    setTask({ text: "" });
    setError("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addNewTask();
      }}
    >
      <MyInput
        value={task.text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTask({ ...task, text: e.target.value })
        }
        type="text"
        placeholder="Введите текст задачи"
      />
      <MyButton type="button" onClick={addNewTask}>
        Добавить задачу
      </MyButton>
      {error ? <div style={{ color: "red" }}>{error}</div> : null}
    </form>
  );
};

export { AddTodo };
