import React, { MouseEvent, useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks/useTypedSelect'
import { changeTodo } from '../store/reducer/TodoReducer'

interface formProps {
    showForm: boolean,
    todoId: string,
    setShowForm: (value: boolean) => void
}
const Form = ({ todoId, showForm, setShowForm }: formProps) => {

    const [todoCase, setTodoCase] = useState('')
    const dispatch = useAppDispatch()
    const changeCase = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (todoCase.trim().length !== 0) {
            dispatch(changeTodo({ id: todoId, text: todoCase }))
            setShowForm(!showForm)
            return
        }
        alert('Заполните поле !')
    }
    return (
        <div className={`${showForm ? 'modal.active' : 'modal'}  fixed top-0 left-0 w-full h-screen flex justify-center bg-[#E6E0D4] bg-opacity-80 items-center`}>
            <form className='w-[300px] h-[200px] bg-white  bg-opacity-100 flex justify-center flex-col items-center p-5 border-[3px] border-[#97A3FF] relative'>
                <span className='close' onClick={() => setShowForm(!showForm)}></span>
                <h2 className='mb-3 text-[17px] text-[#97A3FF]'>Изменить название дела</h2>
                <input value={todoCase} onChange={(e) => setTodoCase(e.target.value)} type="text " className='border-[2px] border-[#97A3FF] outline-none p-2 placeholder:text-[#97A3FF]' placeholder='Текущее дело' />
                <button onClick={changeCase} className='border-[2px] border-[#97A3FF] text-[#97A3FF] mt-3  p-2'>Подтвердить</button>
            </form>
        </div>
    )
}

export default Form