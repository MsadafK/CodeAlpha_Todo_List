import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  const [showInput, setShowInput] = useState(false);
  const [taskValue, setTaskValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [itemId, setItemId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskValue) {
      if (itemId) updateTodoLists();
      else {
        setTodoList((prev) => [
          ...prev,
          {
            id: uuidv4(),
            item: taskValue,
            completed: false,
          },
        ]);
      }
      setTaskValue("");
      setShowInput(false);
      setItemId("");
    } else {
      alert("Add proper value");
    }
  };

  const updateTodoLists = () => {
    const newTodo = todoList.map((todo) =>
      todo.id === itemId ? { itemId, item: taskValue, completed: false } : todo
    );
    setTodoList(newTodo);
  };

  const deleteTodoHandler = (id) => {
    const newTodo = todoList.filter((todo) => id !== todo.id);
    setTodoList(newTodo);
  };

  const handleCheckedTodo = (id, completed) => {
    const newTodo = todoList.map((todo) =>
      todo.id === id ? { id, item: todo.item, completed } : todo
    );
    setTodoList(newTodo);
  };

  return (
    <form className="container">
      {/* HEADER */}
      <div className="header-container">My TODO List</div>

      {/* INPUT SECTION */}
      {showInput && (
        <div className="input-section">
          <input
            type={"text"}
            value={taskValue}
            className="input-field"
            placeholder={taskValue === "" ? "Add Task here" : taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="save-btn"
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowInput(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* TODO SECTION */}
      <div className="todo-lists-section">
        <div className="todo-lists">
          {todoList.length ? (
            todoList.map((todoList) => (
              <div className="todo-list" key={todoList.id}>
                <input
                  type={"checkbox"}
                  className="check-list"
                  checked={todoList.completed}
                  onChange={() =>
                    handleCheckedTodo(todoList.id, !todoList.completed)
                  }
                />
                <div
                  className={
                    todoList.completed ? "text completed-task" : "text"
                  }
                  onClick={() => {
                    setTaskValue(todoList.item);
                    setShowInput(true);
                    setItemId(todoList.id);
                  }}
                >
                  {todoList.item}
                </div>
                <div
                  className="trash-icon"
                  onClick={() => deleteTodoHandler(todoList.id)}
                >
                  &#128465;
                </div>
              </div>
            ))
          ) : (
            <div className="not-found">List is Empty</div>
          )}
        </div>

        {/* ADD BUTTON */}
        {!showInput && (
          <button
            type="button"
            className="new-task-btn"
            onClick={() => setShowInput(true)}
          >
            + New Task
          </button>
        )}
      </div>
    </form>
  );
}

export default App;
