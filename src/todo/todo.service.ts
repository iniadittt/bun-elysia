import { Context } from "elysia";
import { TodoDb, Todo, RequestPostTodo } from "./todo.interface";

const TodoService = {
  getTodos: async (context: Context, db: any): Promise<Todo[] | null> => {
    const todos: TodoDb[] = await db.getTodos();
    if (todos.length === 0) return null;
    const todosRef = todos.map((todo) => ({
      ...todo,
      status: todo.status === "0" ? false : true,
    }));
    return todosRef;
  },
  getTodo: async (context: Context, db: any): Promise<Todo | null> => {
    const { id }: { id: string } = context.params;
    const todo: TodoDb = await db.getTodo(id);
    if (!todo) return null;
    return {
      ...todo,
      status: todo.status === "0" ? false : true,
    };
  },
  postTodo: async (context: Context, db: any): Promise<boolean> => {
    const { title, description }: RequestPostTodo =
      context.body as RequestPostTodo;
    if (!title || !description) return false;
    const dataTodo = { title, description, status: 0 };
    const addTodo: Todo = await db.addTodo(dataTodo);
    if (!addTodo) return false;
    return true;
  },
  patchTodo: async (context: Context, db: any): Promise<boolean> => {
    const { id }: { id: string } = context.params;
    const { status }: { status: boolean } = context.body as { status: boolean };
    if (!id || typeof status !== "boolean") return false;
    await db.updateTodo(id, status);
    return true;
  },
  deleteTodo: async (context: Context, db: any): Promise<boolean> => {
    const { id }: { id: string } = context.params;
    if (!id) return false;
    await db.deleteTodo(id);
    return true;
  },
};

export default TodoService;
