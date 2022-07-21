import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelect";
import { addTodo, dragAndDropTodo, removeTodo, TodoProps } from "../store/reducer/TodoReducer";

import TodoItem from "./TodoItem";
const TodoList = () => {
    const todos = useAppSelector((state) => state.todos.todos);
    const [dragAndDrop, setDragAndDrop] = useState<TodoProps>({} as any)
    const dispatch = useAppDispatch();
    const [addTodoText, setAddTodoText] = useState("");
    const [sortCategory, setSortCategory] = useState("all");
    const newTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addTodo(addTodoText));
        setAddTodoText("");
    };

    const remove = (currentId: string) => {
        dispatch(removeTodo(currentId));
    };

    const sortTodoArray = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortCategory(e.target.value);
    };

    const dragStartHandler = (e: DragEvent<HTMLDivElement>, todo: TodoProps) => {
        setDragAndDrop(todo)
    };

    const dragOverHandler = (e: any) => {
        if (e.target.classList.contains('todo')) {
            e.target.style.border = ' 2px solid red'
        }
        e.preventDefault()
    };
    const dragLeaveHandler = (e: any) => {
        if (e.target.classList.contains('todo')) {
            e.target.style.border = '2px solid #97A3FF'
        }
    };
    const dragDropHandler = (e: any, todo: TodoProps) => {
        if (e.target.classList.contains('todo')) {
            e.target.style.border = '2px solid #97A3FF'
        }
        dispatch(dragAndDropTodo([todo, dragAndDrop]))
        e.preventDefault()
    };
    useEffect(() => {

    })
    return (
        <div className="bg-white rounded-[20px] mt-6 p-8 text-[#97A3FF]">
            <h1 className="text-[40px] font-bold">My TODO List</h1>
            <div className="flex mt-6">
                <input
                    value={addTodoText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setAddTodoText(e.target.value)
                    }
                    type="text"
                    className="p-2 border-2 border-[#97A3FF]  border-solid mr-3"
                    placeholder="Добавить дело"
                />
                <button onClick={newTodo} className="bg-[#97A3FF] text-white p-2">
                    Подтвердить
                </button>
            </div>
            <div className="drag_container">
                {sortCategory == 'all' && todos.map((data) => (
                    <TodoItem
                        onDragStart={(e: DragEvent<HTMLDivElement>) => dragStartHandler(e, data)}
                        onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                        onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
                        onDrop={(e: DragEvent<HTMLDivElement>) => dragDropHandler(e, data)}
                        key={data.id}
                        id={data.id}
                        remove={remove}
                        caseTime={data.caseTime}
                        caseName={data.caseName}
                        caseDone={data.caseDone}
                        order={data.order}
                    />))
                }
                {sortCategory == 'done' && todos.filter(todo => todo.caseDone == true).map((data) => (
                    <TodoItem
                        onDragStart={(e: DragEvent<HTMLDivElement>) => dragStartHandler(e, data)}
                        onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                        onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
                        onDrop={(e: DragEvent<HTMLDivElement>) => dragDropHandler(e, data)}
                        key={data.id}
                        id={data.id}
                        remove={remove}
                        caseTime={data.caseTime}
                        caseName={data.caseName}
                        caseDone={data.caseDone}
                        order={data.order}
                    />
                ))}
                {sortCategory == 'notDone' && todos.filter(todo => todo.caseDone == false).map((data) => (
                    <TodoItem
                        onDragStart={(e: DragEvent<HTMLDivElement>) => dragStartHandler(e, data)}
                        onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                        onDragLeave={(e: DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
                        onDrop={(e: DragEvent<HTMLDivElement>) => dragDropHandler(e, data)}
                        key={data.id}
                        id={data.id}
                        remove={remove}
                        caseTime={data.caseTime}
                        caseName={data.caseName}
                        caseDone={data.caseDone}
                        order={data.order}
                    />
                ))}

            </div>

            <div className="flex justify-end mt-6 w-full">
                <select
                    value={sortCategory}
                    onChange={sortTodoArray}
                    className="border-none outline-none text-right  pr-1"
                >
                    <option value="all">Все</option>
                    <option value="done">Готовые</option>
                    <option value="notDone">В процессе</option>
                </select>
            </div>
        </div>
    );
};

export default TodoList;
