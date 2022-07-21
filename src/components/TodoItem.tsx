import React, { DragEvent } from 'react'
import '../App.css'
import { useAppDispatch } from '../hooks/useTypedSelect';
import { toggleTodo } from '../store/reducer/TodoReducer';

interface TodoItemProps {
    caseName: string;
    caseTime: string;
    caseDone: boolean;
    id: string;
    order: number;
    remove: (id: string) => void;
    onDragStart?: (e: DragEvent<HTMLDivElement>) => void
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void
    onDragOver?: (e: DragEvent<HTMLDivElement>) => void
    onDrop?: (e: DragEvent<HTMLDivElement>) => void
}
const TodoItem: React.FC<TodoItemProps> = ({ caseDone, caseName, caseTime, id, remove, onDragStart, onDragLeave, onDragOver, onDrop }) => {
    const dispatch = useAppDispatch()

    return (
        <div draggable='true'
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`todo ${caseDone ? 'done' : ''}  cursor-move p-3 flex justify-between border-2 border-[#97A3FF] items-center mt-5  `}>
            <div className={`flex items-center   `}>
                <label className='flex relative'>
                    <input type="checkbox" checked={caseDone} onChange={() => dispatch(toggleTodo(id))} />
                    <span aria-hidden="true" className={`custom_checkbox ${caseDone ? 'checkbox_active' : ''}`}></span>
                </label>
                <h2 style={{ maxWidth: '350px', maxHeight: '70px', overflow: "hidden", wordBreak: 'break-all' }}>{caseName}</h2>
                <h2 className='ml-6 mr-4'>{caseTime}</h2>
            </div>
            <button onClick={() => remove(id)} className='bg-[#97A3FF] text-white p-1 decoration-0'>Удалить</button>
        </div>
    )
}


export default TodoItem