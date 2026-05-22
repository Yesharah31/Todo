import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './Components/TodoForm'
import TodoItems from './Components/TodoItems'
import {  TodoProvider } from './Context/TodoContext'

function App() {
  const [Todos , setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Math.floor(Math.random() * 10) , ...todo} , ...prev])
  }

  const updateTodo = (id , todo) => {
    setTodos((prev) => prev.map((eachprev) => (eachprev.id === id ? todo : eachprev)))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevtodo) => prevtodo.id !== id))
  }
  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((prevtodo) => prevtodo.id === id ?
    {...prevtodo , completed : !prevtodo.completed } : prevtodo))
  } 
   
  //get(read) the data frm local storage when reloading the page
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
        setTodos(todos)  
    }
  
  }, [])

  //add data to local storage when useState(todos) is changed(added).
  useEffect(()=> {
    localStorage.setItem("todos" , JSON.stringify(Todos))
  } , [Todos])

  

  return (
    <TodoProvider value = {{Todos, addTodo , updateTodo , deleteTodo, toggleTodo}}>
      <div className="bg-[#172842] min-h-screen py-8 ">
        <div className="w-full max-w-2xl  mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className='text-3xl font-bold text-center mt-2'>Manage Your Todos</h1>
          <div className='mb-4'>
            <TodoForm/>
          </div>
          <div className='flex flex-wrap gap-y-3'>
            {Todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                  <TodoItems todo={todo}/>

              </div>
            ))}
          </div>
            
        </div>
      </div>
    </TodoProvider>
  )
}

export default App