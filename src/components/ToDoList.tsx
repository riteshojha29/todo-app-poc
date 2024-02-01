import React from 'react';
import { todoDataService  } from '../db/database';

import { ToDoItem } from './ToDoItem';
import { ToDoTask } from '../types/ToDoTask';

interface ToDoItemsProp {
    todoItems: ToDoTask[];
    setToDoItems : React.Dispatch<React.SetStateAction<ToDoTask[]>>;
}

export const ToDoList: React.FC<ToDoItemsProp> = ({todoItems, setToDoItems}) => {

    const handleDeleteTodo = (id: number): void => {
        setToDoItems(
            (current) => current.filter(
                (todo) => todo.id !== id)
        );

      // Deleting data from local db
        todoDataService.deleteToDoTask(id);
    };

    const handleCompleteTodo = (id: number): void => {
        const elementsIndex = todoItems.findIndex(item => item.id === id);

        const eligibleData = todoItems[elementsIndex];
        eligibleData.isCompleted = !eligibleData.isCompleted;

        let tempToDoItems = todoItems;
        tempToDoItems[elementsIndex] = eligibleData;

        setToDoItems(tempToDoItems);

        // Updating a task
        todoDataService.updateToDoTask(eligibleData);
    };


    return(
        <>
            {todoItems.map((item : ToDoTask) => (
                <ToDoItem 
                    key={item.id} 
                    todo={item} 
                    deleteTodo={handleDeleteTodo} 
                    completeTodo={handleCompleteTodo}/>
            ))}
        </>
    );
};