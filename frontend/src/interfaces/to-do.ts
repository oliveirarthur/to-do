export interface IToDoItem {
  id?: number;
  description: string;
  is_complete: boolean;
  change_count: number;
  assignee: {
    id?: number;
    name: string;
    email: string;
  };
}
