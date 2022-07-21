import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';


export interface TodoProps {
    id : string;
    caseDone : boolean;
    caseName : string;
    caseTime : string;
    order : number;

  }
  interface todoState {
    todos : TodoProps[]
  }

  const initialState : todoState = {
    todos : [
        { caseDone: true, caseName: '1 кейс', caseTime: '10:10:12', id: '1', order : 1 },
        { caseDone: false, caseName: '2 кейс', caseTime: '10:10:12', id: '2', order : 2 },
        { caseDone: true, caseName: '3 кейс', caseTime: '10:10:12', id: '3', order : 3 },
        { caseDone: false, caseName: '4 кейс', caseTime: '10:10:12', id: '4', order : 4 },
    ]
  }
// let tempArray = [] as any
  export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
      addTodo: (state, action : PayloadAction<string>) => {
        state.todos.unshift({
            caseDone: false,
            caseName: action.payload,
            caseTime: new Date().toLocaleString(),
            id: String(Date.now()),
            order : state.todos.length + 1
        })
      },
      removeTodo: (state, action : PayloadAction<string>) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload)
      },
      toggleTodo : (state, action : PayloadAction<string>) => {
       const findCurrentCheckbox = state.todos.find(todo => todo.id === action.payload)
       if(findCurrentCheckbox) {
        findCurrentCheckbox.caseDone = !findCurrentCheckbox.caseDone
       }
      
      },
      
      // sortTodo : (state, action : PayloadAction<string>) => {
       
      //  switch(action.payload) {
      //   case 'all' :
      //    state.todos =  initialState.todos
      //   break
      //   case 'done' :
      //   state.todos = initialState.todos
      //   state.todos =  state.todos.filter(todo => todo.caseDone === true)
      //   break
      //   case 'notDone' :
      //   state.todos =  initialState.todos
      //   state.todos =  state.todos.filter(todo => todo.caseDone === false)
      //   break
      //  }
      // },
      dragAndDropTodo : (state , action : PayloadAction<TodoProps[]>) => {
       const findSelectedId = state.todos.findIndex(todo => todo.order == action.payload[0].order)
       const findCurrentId = state.todos.findIndex(todo => todo.order == action.payload[1].order)
       const currentId =  state.todos[findCurrentId];
       state.todos[findCurrentId] = state.todos[findSelectedId]
       state.todos[findSelectedId] = currentId

      }

    },
  })
  
  export const { addTodo, removeTodo,  toggleTodo, dragAndDropTodo } = todoSlice.actions
  

  export const selectCount = (state: RootState) => state.todos
  
  export default todoSlice.reducer