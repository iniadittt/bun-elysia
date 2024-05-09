import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import TodoModule from "./todo/todo.module";

const app: Elysia = new Elysia();

app.use(html());
app.use(staticPlugin());
app.use(TodoModule);

app.get("/", () => Bun.file("./public/html/index.html").text());
app.get("/script.js", () => Bun.file("./public/js/script.js").text());
app.get("/public/*", () => {
  return {
    message: "File not found",
    status: 404,
  };
});

app.listen(3000, () =>
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  )
);
