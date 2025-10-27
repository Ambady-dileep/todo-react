import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput.jsx"
import TodoItem from "./components/TodoItem.jsx"

function App(){
  const [todos,setTodos] = useState([]);
  const [filter,setFilter] = useState(["all"]);

  // Load todos only once on startup
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error("Corrupted todos in localStorage, clearing...",error);
        localStorage.removeItem("todos");
      }
    }
  }, []);

  // Save todos every time they change — but only if not empty
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);


  const addTodo = (text) =>{
    setTodos([...todos,{id:Date.now(),text,completed:false}])
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo)=>todo.id!==id));
  };

  const toggleTodo = (id) =>{
    setTodos(
      todos.map((todo)=>todo.id === id ? {...todo,completed:!todo.completed}:todo
      )
    )
  }

  const updateTodo = (id,newText)=>{
    setTodos(
      todos.map((todo)=>
      todo.id === id ? {...todo,text:newText}:todo
      )
    );
  };

  const getFilteredTodos = () =>{
      if (filter === "active") return todos.filter(todo=> !todo.completed);
      if (filter === "completed") return todos.filter(todo=> todo.completed);
      return todos;
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo=>!todo.completed));
  };

  return (
      <div className="app">
        <h1>Todo App</h1>
        <TodoInput addTodo={addTodo}/>
        <div className = "filters   ">
          <button onClick={()=> setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
        <ul>
          {getFilteredTodos().map((todo)=>(
            <TodoItem
            key = {todo.id}
            todo ={todo}
            deleteTodo = {deleteTodo}
            toggleTodo = {toggleTodo}
            updateTodo = {updateTodo}
            />
          ))}
        </ul>

        {todos.some(todo => todo.completed) && (
          <button onClick={clearCompleted}>Clear Completed</button>
        )}

      </div>
  );
}

export default App;