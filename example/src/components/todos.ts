import { useState, useEffect, FC, map } from "lasso";
import { TodoListItem, getTodos as TodosXHR, TodoItem } from "./todo.list";

export const Todos: FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const getTodos = () => setTodos(TodosXHR);
  useEffect(getTodos, []);

  return ({ html, css }) => {
    const styles = {
      button: css("text-xs font-medium bg-[#00a3ff] rounded-md px-6 py-2"),
    };

    return html`<div>
      <button class=${styles.button} onClick=${getTodos}>Update todos</button>
      <ul>
        ${map(TodoListItem, todos())}
      </ul>
    </div>`;
  };
};
