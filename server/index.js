const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const DATA_FILE = path.join(__dirname, "db.json");

// Функция для чтения данных (возвращает объект с массивом tasks)
async function readData() {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  const parsed = JSON.parse(data);
  return parsed; // возвращаем весь объект
}

// Обновленная функция для получения массива задач
async function getTasks() {
  const data = await readData();
  return data.tasks;
}

// Обработка GET /tasks с пагинацией и фильтрацией
app.get("/tasks", async (req, res) => {
  const { page = 1, limit = 10, filter = "all" } = req.query;
  let data = await getTasks();

  // фильтрация
  if (filter === "completed") {
    data = data.filter((task) => task.completed);
  } else if (filter === "active") {
    data = data.filter((task) => !task.completed);
  }
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const currentPage = parseInt(page);
  const limitNum = parseInt(limit);

  const start = (currentPage - 1) * limitNum;
  const paginatedData = data.slice(start, start + limitNum);

  res.json({
    data: paginatedData,
    total,
    page: currentPage,
    limit: limitNum,
    totalPages,
  });
});

// Обработка POST /tasks для добавления новой задачи
app.post("/tasks", async (req, res) => {
  const { text, completed = false } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const dataObject = await readData(); // весь объект
  const tasks = dataObject.tasks;

  const newTask = {
    id: Date.now().toString(),
    text,
    completed,
    createdAt: Date.now(),
  };

  tasks.push(newTask);
  await fs.writeJson(DATA_FILE, dataObject);

  res.status(201).json(newTask);
});

// Обработка PUT /tasks/:id для обновления задачи
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const dataObject = await readData();
  const tasks = dataObject.tasks;

  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (text !== undefined) {
    tasks[taskIndex].text = text;
  }
  if (completed !== undefined) {
    tasks[taskIndex].completed = completed;
  }

  await fs.writeJson(DATA_FILE, dataObject);
  res.json(tasks[taskIndex]);
});

// Обработка DELETE /tasks/:id для удаления задачи
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const dataObject = await readData();
  const tasks = dataObject.tasks;

  const newTasks = tasks.filter((task) => task.id !== id);
  if (newTasks.length === tasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  dataObject.tasks = newTasks;
  await fs.writeJson(DATA_FILE, dataObject, { encoding: "utf8" });
  res.status(204).send(); // возвращает HTTP 204 без тела
});

app.patch("/tasks/:id/toggle", async (req, res) => {
  const { id } = req.params;
  const dataObject = await readData();
  const tasks = dataObject.tasks;

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;

  await fs.writeJson(DATA_FILE, dataObject);
  res.json(task);
});
// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
