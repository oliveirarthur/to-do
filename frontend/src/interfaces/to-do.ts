export interface IToDoItem {
  id?: number;
  description: string;
  assignee: {
    name: string;
    email: string;
  };
}
