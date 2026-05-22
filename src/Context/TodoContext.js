import { createContext, useContext } from "react";


export const TodoContext = createContext({
    Todos : [{
        id: 1 ,
        todo : "this is my first todo",
        completed : false
    }],
    addTodo : (todo) => {},
    updateTodo : (id, todo) => {},
    deleteTodo : (id) => {},
    toggleTodo : (id) => {}

})

export const useTodo = () => { return useContext(TodoContext) }


export const TodoProvider = TodoContext.Provider

