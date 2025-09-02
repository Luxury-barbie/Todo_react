import { useReducer, useState } from "react";
import './Todo.css';

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), text: action.payload, isEditing: false }];
    case "DELETE_TODO":
      return state.filter(todo => todo.id !== action.payload);
    case "START_EDIT":
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, isEditing: true } : todo
      );
    case "UPDATE_TODO":
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, isEditing: false }
          : todo
      );
    default:
      return state;
  }
};

const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: "ADD_TODO", payload: inputValue });
      setInputValue("");
    }
  };

  const deleteTodo = id => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const startEdit = id => {
    dispatch({ type: "START_EDIT", payload: id });
  };

  const updateTodo = (id, newText) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, text: newText } });
  };

  return (
    <div className="main_body">
      <h1>Todo List</h1>
      <div className="todo_container">
        <div className="input_container">
          <input
            type="text"
            value={inputValue}
            placeholder="Add a task..."
            onChange={e => setInputValue(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <div className="listing" style={{ width: "100%" }}>
          {todos.map(todo => (
            <div className="task" key={todo.id}>
              {todo.isEditing ? (
                <input
                  type="text"
                  defaultValue={todo.text}
                  onBlur={e => updateTodo(todo.id, e.target.value)}
                  autoFocus
                  style={{
                    flex: 1,
                    height: "45px",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#2c2c2c",
                    color: "white",
                    fontSize: "1rem"
                  }}
                />
              ) : (
                <>
                  <p>{todo.text}</p>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => startEdit(todo.id)}>Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
