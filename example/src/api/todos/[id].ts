import type { Handler, Request } from "lasso";
import todos from "./todos";

export interface TodosParams {
  id: string;
}

export type TodosRequest = Request<{
  Params: TodosParams;
}>;

const TodosLogicV1 = (id: string) =>
  todos.find((todo) => todo.id === parseInt(id));

const TodosHandler: Handler = (server, route) => {
  server.get(route, (req: TodosRequest, reply) => {
    if (req.params.id) {
      reply.send(TodosLogicV1(req.params.id));
    } else {
      reply.send({});
    }
  });
};

export default TodosHandler;
