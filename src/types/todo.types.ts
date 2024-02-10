export interface ITodo {
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

export interface TodoDetailResponseBody extends ITodo {
  id: string;
}
