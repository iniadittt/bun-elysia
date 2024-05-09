export interface TodoDb {
  id: number;
  title: string;
  description: string;
  status: string;
}
export interface Todo {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export interface ResponseGetTodos {
  status: number;
  data: Todo[] | null;
}

export interface ResponseGetTodo {
  status: number;
  data: Todo | null;
}

export interface ResponsePostTodo {
  status: number;
  data: boolean;
}

export interface ResponsePatchTodo {
  status: number;
  data: boolean;
}

export interface ResponseDeleteTodo {
  status: number;
  data: boolean;
}

export interface RequestPostTodo {
  author: string;
  title: string;
  description: string;
}
