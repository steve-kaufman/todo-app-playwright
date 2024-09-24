import { useState } from "react";
import "./App.css";
import { TodoEditor } from "./TodoEditor";

export type Todo = {
  name: string;
  description: string;
  isComplete: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [creatingTodo, setCreatingTodo] = useState(false);

  const toggleTodo = (index: number) => () => {
    setTodos((todos) =>
      todos.map((todo, i) =>
        i === index ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  const createTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
    setCreatingTodo(false);
  };

  return (
    <>
      <header className="page-header">
        <h1>Todo App</h1>
      </header>
      <main className="page-main">
        <header className="todos-header">
          <h2>Todos</h2>
          <button
            className="add-todo-btn"
            data-testId="add-todo-btn"
            onClick={() => setCreatingTodo(true)}
          >
            +
          </button>
        </header>
        <main className="todos-main">
          <ol className="todos-list">
            {todos.map((todo, i) => (
              <li key={i} className="todo-item">
                <div className="todo-details">
                  <h3 className="todo-item-name">{todo.name}</h3>
                  <p className="todo-item-desc">{todo.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={toggleTodo(i)}
                />
              </li>
            ))}
          </ol>
        </main>
      </main>
      {creatingTodo ? (
        <TodoEditor
          todo={{ name: "", description: "", isComplete: false }}
          updateTodo={createTodo}
          cancel={() => setCreatingTodo(false)}
        />
      ) : null}
    </>
  );
}

export default App;
