import { openDB, DBSchema } from 'idb';
import { ToDoTask } from '../types/ToDoTask';
  
  interface todoDB extends DBSchema {
    todoData: {
      value: ToDoTask;
      key: number;
      indexes: { id: number };
    };
  }

  export const dbPromise = openDB<todoDB>("todoPwaDatabase", 1, {
    upgrade(db) {
      const dbStore = db.createObjectStore("todoData", {
        keyPath: "id",
        autoIncrement: true,
      });
  
      dbStore.createIndex("id", "id", { unique: true });
    },
  });


export const todoDataService = {

    // Save todo task in database
    async saveToDoTask(data: ToDoTask) {
        const db = await dbPromise;
        const transaction = db.transaction('todoData', 'readwrite');
        const store = transaction.objectStore('todoData');
        await store.add(data);
    },

    // Get all todo tasks from database
    async getToDoTasks(): Promise<ToDoTask[]> {
        const db = await dbPromise;
        const transaction = db.transaction('todoData', 'readonly');
        const store = transaction.objectStore('todoData');
        const results = await store.getAll();
        return results;
    },

    async deleteToDoTask(id: number) {
        const db = await dbPromise;
        const transaction = db.transaction('todoData', 'readwrite');
        const store = transaction.objectStore('todoData');
        await store.delete(id);
    },

    async updateToDoTask(data: ToDoTask) {
        const db = await dbPromise;
        const transaction = db.transaction('todoData', 'readwrite');
        const store = transaction.objectStore('todoData');
        await store.put(data);
      },
};








