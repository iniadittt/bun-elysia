import { Database } from "bun:sqlite";
import { Todo } from "./todo.interface";

export default class TodoRepository {
  private db: Database;

  constructor() {
    this.db = new Database("todo.db");
    this.init()
      .then(() => console.log("Database initialized"))
      .catch(console.error);
  }

  async init() {
    return this.db.run(
      "CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, status BOOLEAN)"
    );
  }

  async getTodos() {
    return this.db.query("SELECT * FROM todo").all();
  }

  async getTodo(id: number) {
    return this.db.query(`SELECT * FROM todo WHERE id = ${id}`).get();
  }

  async addTodo(todo: Todo) {
    return this.db
      .query(
        "INSERT INTO todo (title, description, status) VALUES (?, ?, ?) RETURNING id"
      )
      .get(todo.title, todo.description, todo.status) as Todo;
  }

  async updateTodo(id: number, status: boolean) {
    return this.db.run(
      `UPDATE todo SET status = ${status ? 1 : 0} WHERE id = ${id}`
    );
  }

  async deleteTodo(id: number) {
    return this.db.run(`DELETE FROM todo WHERE id = ${id}`);
  }

  async deleteTodos() {
    return this.db.run(`DELETE FROM todo`);
  }
}
