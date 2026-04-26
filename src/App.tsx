import { useState, useEffect } from 'react';
import { Header } from './shared/components/Header';
import { TodoItem } from './features/todo/ui/TodoItem';
import { AddTodo } from './features/todo/ui/AddTodo';
import { SortAndFilterTodo } from './features/todo/ui/SortAndFilterTodo';
import { Todo, Filter } from './features/todo/model/types';
import { useTheme } from './theme/themeContext';
import { todoApi } from './api/todoApi';
import { MySelect } from './shared/components/MySelect';
import { Pagination } from './features/pagination/Pagination';
import { getPageCount } from './utils/pages';
import styled from 'styled-components';
const StyledApp = styled.div`
  min-height: 100vh;
  width: 800px;
  padding-top: 2rem;
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.color};
`;

function App() {
  const { toggleTheme, theme } = useTheme(); // получаем из контекста
  const isDarkTheme = theme === 'dark';
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    getPageCount(tasks.length, limit)
  );
  const changePage = (pageNumber: number) => {
    setPage(pageNumber);
  };
  useEffect(() => {
    todoApi
      .getAll()
      .then(fetchedTasks => {
        setTasks(fetchedTasks);
      })
      .catch(error => {
        console.error('Ошибка загрузки задач:', error);
      });
  }, []);
  const [filter, setFilter] = useState<Filter>({
    status: undefined,
    sortDate: 'newest',
  });

  // Создать задачу
  const createTask = (task: { text: string }) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: task.text,
      completed: false,
      createdAt: Date.now(),
    };
    todoApi
      .add(newTodo)
      .then(savedTask => {
        setTasks(prev => [...prev, savedTask]);
      })
      .catch(error => {
        console.error('Ошибка при добавлении:', error);
      });
  };

  // Удалить задачу
  const deleteTask = (id: number) => {
    todoApi
      .delete(id)
      .then(() => {
        setTasks(prev => prev.filter(task => task.id !== id));
      })
      .catch(error => {
        console.error('Ошибка при удалении:', error);
      });
  };

  // Обновить текст задачи
  const updateTask = (id: number, newText: string) => {
    todoApi
      .update(id, { text: newText })
      .then(updatedTask => {
        setTasks(prev => prev.map(t => (t.id === id ? updatedTask : t)));
      })
      .catch(error => {
        console.error('Ошибка при обновлении задачи:', error);
      });
  };

  // Переключить завершенность
  const toggleCompleteTask = (id: number) => {
    todoApi
      .toggle(id)
      .then(updatedTask => {
        setTasks(prev =>
          prev.map(task => (task.id === id ? updatedTask : task))
        );
      })
      .catch(error => {
        console.error('Ошибка при переключении статуса:', error);
      });
  };

  // Отсортировать и отфильтровать задачи
  const sortedAndFilteredTasks = (() => {
    let filtered = [...tasks];

    if (filter.status === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter.status === 'notCompleted') {
      filtered = filtered.filter(task => !task.completed);
    }

    if (filter.sortDate === 'newest') {
      filtered.sort((a, b) => b.createdAt - a.createdAt);
    } else if (filter.sortDate === 'oldest') {
      filtered.sort((a, b) => a.createdAt - b.createdAt);
    }

    return filtered;
  })();
  useEffect(() => {
    const total = getPageCount(sortedAndFilteredTasks.length, limit);
    setTotalPages(total);
    if (page > total) {
      setPage(1);
    }
  }, [tasks, filter, limit, sortedAndFilteredTasks]);
  const paginatedTasks = (() => {
    if (limit === -1) {
      return sortedAndFilteredTasks;
    } else {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      return sortedAndFilteredTasks.slice(startIndex, endIndex);
    }
  })();
  return (
    <StyledApp>
      <Header
        toggleTheme={toggleTheme}
        themeType={isDarkTheme ? 'dark' : 'light'}
      />
      <section id="center">
        <SortAndFilterTodo filter={filter} setFilter={setFilter} />
        <MySelect
          defaultValue="Кол-во элементов на странице"
          value={limit}
          onChange={value => {
            const numValue = typeof value === 'string' ? Number(value) : value;
            setLimit(numValue);
          }}
          options={[
            { value: 5, name: '5' },
            { value: 10, name: '10' },
            { value: 15, name: '15' },
            { value: -1, name: 'Показать все' },
          ]}
        ></MySelect>
        <hr />
        {paginatedTasks.map((task, index) => (
          <TodoItem
            key={task.id}
            number={(page - 1) * limit + index + 1}
            task={task}
            toggleComplete={toggleCompleteTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
        <AddTodo create={createTask} />
        <Pagination
          page={page}
          changePage={changePage}
          totalPages={totalPages}
        />
      </section>
    </StyledApp>
  );
}

export { App };
