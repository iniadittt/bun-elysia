import { Elysia } from "elysia";
import TodoController from "./todo.controller";

const TodoModule: Elysia = new Elysia();

TodoController(TodoModule);

export default TodoModule;
