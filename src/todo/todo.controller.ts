import { Elysia, t } from "elysia";
import { Context } from "elysia";
import TodoService from "./todo.service";
import TodoRepository from "./todo.repository";
import {
  Todo,
  ResponseGetTodos,
  ResponseGetTodo,
  ResponsePostTodo,
  ResponsePatchTodo,
  ResponseDeleteTodo,
} from "./todo.interface";

const TodoController = (app: Elysia) => {
  const db = new TodoRepository();

  app.get("/todos", async (context: Context): Promise<ResponseGetTodos> => {
    const data: Todo[] = await TodoService.getTodos(context, db);
    return { status: 200, data };
  });
  app.get("/todo/:id", async (context: Context): Promise<ResponseGetTodo> => {
    const data: Todo = await TodoService.getTodo(context, db);
    return { status: 200, data };
  });
  app.post(
    "/todo",
    async (context: Context): Promise<ResponsePostTodo> => {
      const data: boolean = await TodoService.postTodo(context, db);
      return { status: data ? 200 : 400, data };
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
      }),
    }
  );
  app.patch(
    "/todo/:id",
    async (context: Context): Promise<ResponsePatchTodo> => {
      const data: boolean = await TodoService.patchTodo(context, db);
      return { status: data ? 200 : 400, data };
    },
    {
      body: t.Object({
        status: t.Boolean(),
      }),
    }
  );
  app.delete(
    "/todo/:id",
    async (context: Context): Promise<ResponseDeleteTodo> => {
      const data: boolean = await TodoService.deleteTodo(context, db);
      return { status: data ? 200 : 400, data };
    }
  );
  app.delete(
    "/todos",
    async (context: Context): Promise<ResponseDeleteTodo> => {
      await db.deleteTodos();
      return { status: 200, data: true };
    }
  );
};

export default TodoController;
