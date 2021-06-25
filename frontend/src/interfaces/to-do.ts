export interface IToDoItem {
  id?: number;
  description: string;
  isComplete: boolean;
  assignee: {
    id?: number;
    name: string;
    email: string;
  };
}
