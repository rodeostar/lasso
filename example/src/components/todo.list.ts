import type { FC } from "lasso";

export type TodoItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function getTodos(): Promise<TodoItem[]> {
  const arr = [...new Array(2)].map(async () => {
    try {
      const response = await fetch(
        `/api/todos/${Math.floor(Math.random() * 10) + 1}`
      );
      const j: TodoItem = await response.json();
      return j;
    } catch (error) {
      console.log(error);
    }
  });
  const json = await Promise.all(arr);
  return json;
}

export const TodoListItem: FC<TodoItem> =
  () =>
  ({ props: { id, title }, html, css }) =>
    html`<li class=${css("capitalize font-serif")}>
      <span>#${id}</span>: ${title}
    </li>`;
