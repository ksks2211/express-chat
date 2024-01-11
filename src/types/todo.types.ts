export interface Todo {
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

export interface TodoDetailResponseBody extends Todo {
  id: string;
}
