import React, { useState} from 'react';
import { ToDoTask } from '../types/ToDoTask';

interface ToDOForProps {
  todoItems: ToDoTask[];
  setToDoItems : React.Dispatch<React.SetStateAction<ToDoTask[]>>;
}

export const ToDoForm: React.FC<ToDOForProps> = ({todoItems, setToDoItems}) => {

    const [description, setDescription] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      
      if(!description) {
        alert('Please fill task description');
        return;
      }

      setToDoItems([...todoItems, new ToDoTask(description)]);
      setDescription('');
    }

    return (
      <form className='todo-form' onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor='todo-description'>Description</label>
            <input 
            value={description} 
            onChange={(event) => setDescription(event.target.value)} 
            type='text' id='todo-description' 
            placeholder='write new task'/>
          </div>
        </div>
        
        <button type='submit'>Add Task</button>
      </form>
    );
};