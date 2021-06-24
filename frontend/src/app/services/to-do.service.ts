import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  constructor() {}

  async list() {
    return Array.from({ length: 100 }, (v, k) => {
      return {
        id: k,
        title: `ToDo item ${k}`,
        items: Array.from({ length: 10 }, (v, k) => {
          return {
            id: k,
            description: `Item ${k + 1}`,
            checked: false,
          };
        }),
      };
    });
  }
}
