import React from 'react';
import { ToDoTask } from '../types/ToDoTask';

type Props = {
    todo : ToDoTask
    deleteTodo: (id: number) => void  
    completeTodo: (id: number) => void
}

export const ToDoItem: React.FC<Props> = ({todo, deleteTodo, completeTodo}) => {
    return (
        <>
            <div className='card'>
                <div className='card-text'>
                    <h5 className={todo.isCompleted ? 'line-through' : ''}>{todo.description}</h5>
                </div>

                <div className='card-button'>
                    <button
                    onClick={() => completeTodo(todo.id)}
                    className={todo.isCompleted ? 'hide-button' : 'Card-button-update'}>
                    Done
                    </button>

                    <button
                    onClick={() => deleteTodo(todo.id)}
                    className='card-button-delete'>
                    Delete
                    </button>
                </div>
            </div>
        </>
    );
};