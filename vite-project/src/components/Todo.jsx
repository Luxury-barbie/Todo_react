import { useState } from "react";
import "./Todo.css"


const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  

  const addTodo = () => {
    if (inputValue.trim() !== '') 
        setTodos([...todos, inputValue])
        setInputValue("")
       
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="main_body">
      <h1>Todo List</h1>
      <div className="todo_container">
        <div className="input_container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter Task"
          />
          <button onClick={addTodo}> Add Task </button>
        </div>
         {todos.map((item, index) => (
          <div className="task" key={index}>
            <p>{item}</p>
          </div>
         ))}
         
      </div>
    </div>
  );
};

export default Todo;