import React, { useState, useEffect } from 'react';
import { todoDataService  } from './db/database';

import './App.css';
import { ToDoForm } from './components/ToDoForm';
import { ToDoList } from './components/ToDoList';
import { ToDoTask } from './types/ToDoTask';

const App: React.FC = () => {
  const [todoItems, setToDoItems] = useState<ToDoTask[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await todoDataService.getToDoTasks();
      setToDoItems(fetchedTasks);
    };
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <ToDoForm todoItems={todoItems} setToDoItems={setToDoItems}/>
      <ToDoList todoItems={todoItems} setToDoItems={setToDoItems} />
    </div>
  );
}

export default App;
