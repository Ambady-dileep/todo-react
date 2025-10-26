import { useState } from "react"

function TodoInput({addTodo}){
    const [input,setInput] = useState("");
    const handleAdd = () => {
        if (!input.trim())return;
        addTodo(input);
        setInput("");
    };
    return (
        <div className = "input-section">
            <input
                type="text"
                placeholder="Add your task..."
                value={input}
                onChange={(e) =>setInput(e.target.value)}
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    )
}



export default TodoInput;