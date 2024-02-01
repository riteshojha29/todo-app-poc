import { openDB, DBSchema } from 'idb';
import { ToDoTask } from '../types/ToDoTask';
  
  interface todoDB extends DBSchema {
    todoData: {
      value: ToDoTask;
      key: number;
      indexes: { id: number };
    };
  }

  const dbName = "todoPwaDatabase";
  const dbVersion: number = 1;
  const dbTableName = "todoData";

  export const dbPromise = openDB<todoDB>(dbName, dbVersion, {
    upgrade(db) {
      const dbStore = db.createObjectStore(dbTableName, {
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
        const transaction = db.transaction(dbTableName, 'readwrite');
        const store = transaction.objectStore(dbTableName);
        await store.add(data);
    },

    // Get all todo tasks from database
    async getToDoTasks(): Promise<ToDoTask[]> {
        const db = await dbPromise;
        const transaction = db.transaction(dbTableName, 'readonly');
        const store = transaction.objectStore(dbTableName);
        const results = await store.getAll();
        return results;
    },

    async deleteToDoTask(id: number) {
        const db = await dbPromise;
        const transaction = db.transaction(dbTableName, 'readwrite');
        const store = transaction.objectStore(dbTableName);
        await store.delete(id);
    },

    async updateToDoTask(data: ToDoTask) {
        const db = await dbPromise;
        const transaction = db.transaction(dbTableName, 'readwrite');
        const store = transaction.objectStore(dbTableName);
        await store.put(data);
      },
};








