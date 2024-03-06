import { Component, For, createEffect, createSignal } from "solid-js";

import styles from "./style.module.css";
import { setCookie, getCookie } from "../utils/cookie";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const ToDoListComponent: Component = () => {
  const [todos, setTodos] = createSignal<Todo[]>([
    {
      id: 2,
      text: 'To create a new todo, write its title below and click "Add todo"',
      completed: false,
    },
  ]);
  const [newTodoLabel, setNewTodoLabel] = createSignal<string>("Unnamed todo");

  try {
    setTodos(JSON.parse(getCookie("todos")));
  } catch {
    setTodos([
      {
        id: 2,
        text: 'To create a new todo, write its title below and click "Add todo"',
        completed: false,
      },
    ]);
  }

  createEffect(() => {
    setCookie("todos", JSON.stringify(todos()));
  });

  function handleOnSubTitleClick() {
    const newTodo: Todo = {
      id: 0,
      text: newTodoLabel(),
      completed: false,
    };
    setTodos([...todos(), newTodo]);
  }

  function handleToggle(id: number) {
    setTodos(
      todos().map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      })
    );
  }

  function handleTodoLabelChange(event: any) {
    if (event.target.value.replace(/\s/g, "") == "") {
      setNewTodoLabel("Unnamed todo");
      return;
    }

    setNewTodoLabel(event.target.value);
  }

  function handleAddTodoClick() {
    const newTodo: Todo = {
      id: 0,
      text: newTodoLabel(),
      completed: false,
    };

    if (todos().length > 0) {
      newTodo.id = todos()[todos().length - 1].id + 1;
    }

    setTodos([...todos(), newTodo]);
    // @ts-ignore
    document.getElementById("todo_title_input").value = "";
  }

  function handleRemoveAllClick() {
    if (todos().length > 0) {
      if (
        confirm(
          "Are you sure you want to remove all the todos? This action cannot be undone!"
        )
      ) {
        setTodos([]);
      }
    } else {
      alert("You don't have any todos, what you're trying to remove?");
    }
  }

  function handleRemoveTodoClick(todo: Todo) {
    setTodos(todos().filter((item) => item !== todo));
    handleToggle(todo.id);
  }

  return (
    <div class={styles.wrapper}>
      <h1 title="Title, so what did you want to see here?" class={styles.title}>
        Your todos:
      </h1>
      <h2
        title="Add new todo"
        class={todos().length === 0 ? styles.subTitle : styles.subTitleHidden}
        onClick={handleOnSubTitleClick}
      >
        It's kind of empty in here..
      </h2>
      <For each={todos()}>
        {(todo) => (
          <div class={styles.todoWrapper}>
            <span
              id={todo.id.toString()}
              onClick={() => handleToggle(todo.id)}
              class={
                todo.completed ? styles.todoLabelCompleted : styles.todoLabel
              }
            >
              {todo.text}
            </span>
            <button
              title="Remove completed todo"
              class={
                todo.completed ? styles.buttonRemove : styles.buttonRemoveHidden
              }
              onClick={
                todo.completed ? () => handleRemoveTodoClick(todo) : () => {}
              }
            >
              <svg
                // FaSolidTrashCan
                fill="currentColor"
                stroke-width="0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height="1.5em"
                width="1.5em"
                style="overflow: visible; color: currentcolor;"
              >
                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
              </svg>
            </button>
          </div>
        )}
      </For>
      <input
        id="todo_title_input"
        title="Todo title"
        onChange={handleTodoLabelChange}
        class={styles.input}
        placeholder="Write the title of the todo here"
      ></input>
      <button
        title="Add todo"
        class={styles.buttonAdd}
        onClick={handleAddTodoClick}
      >
        Add todo
      </button>
      <button
        title="Remove all todos"
        class={styles.buttonRemoveAll}
        onClick={handleRemoveAllClick}
      >
        Remove All
      </button>
    </div>
  );
};

export default ToDoListComponent;
