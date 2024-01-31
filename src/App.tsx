import React, { useState } from 'react';
import './App.css';
import { ToDoForm } from './components/ToDoForm';
import { ToDoList } from './components/ToDoList';
import { ToDoTask } from './types/ToDoTask';

const App: React.FC = () => {
  const [todoItems, setToDoItems] = useState<ToDoTask[]>([])

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <ToDoForm todoItems={todoItems} setToDoItems={setToDoItems}/>
      <ToDoList todoItems={todoItems} setToDoItems={setToDoItems} />
    </div>
  );
}

export default App;
