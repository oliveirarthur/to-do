export interface IToDoItem {
  id?: number;
  description: string;
  is_complete: boolean;
  assignee: {
    id?: number;
    name: string;
    email: string;
  };
}
