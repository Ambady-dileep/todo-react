import { useState } from "react";
import TodoInput from "./components/TodoInput.jsx"

function App(){
  const [todos,setTodos] = useState([]);
  const addTodo = (text) =>{
    setTodos([...todos,{id:Date.now(),text,completed:false}])
  };
  return (
      <div className="app">
        <h1>Todo App</h1>
        <TodoInput addTodo={addTodo}/>
        <ul>
          {todos.map((todo)=>(
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;