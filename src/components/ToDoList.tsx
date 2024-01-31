import React from 'react';
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
    };

    const handleCompleteTodo = (id: number): void => {
        const elementsIndex = todoItems.findIndex(item => item.id === id);
        
        let tempToDoItems = todoItems;
        
        tempToDoItems[elementsIndex] = {...tempToDoItems[elementsIndex], 
            isCompleted: !tempToDoItems[elementsIndex].isCompleted};

        setToDoItems(tempToDoItems);
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