import { Injectable } from '@angular/core';
import { IToDoItem } from 'src/interfaces/to-do';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  constructor() {}

  async list() {
    return Array.from({ length: 100 }, (v, k) => {
      return {
        id: k,
        description: `Task ${k}`,
        assignee: {
          name: `Responsável ${k}`,
          email: `assignee@example.com`,
        },
      } as IToDoItem;
    });
  }

  async save(item: IToDoItem) {
    console.log(`🚀 ~ item`, item);
    return item;
  }
}
