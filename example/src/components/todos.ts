import { useState, useEffect, type FC, map } from "@rodeostar/lasso";
import { makeButton } from "./styles";
import { TodoListItem, getTodos as TodosXHR, type TodoItem } from "./todo.list";

export const Todos: FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const getTodos = () => setTodos(TodosXHR);
  useEffect(getTodos, []);

  return ({ html, css }) => {
    const styles = {
      button: makeButton(css),
    };

    return html`<div>
      <button class=${styles.button} onClick=${getTodos}>Update todos</button>
      <ul>
        ${map(TodoListItem, todos())}
      </ul>
    </div>`;
  };
};
