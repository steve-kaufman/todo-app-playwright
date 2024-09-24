import { FormEvent, useState } from "react";
import { Todo } from "./App";
import "./TodoEditor.css";

type Props = {
  title: string;
  todo: Todo;
  updateTodo: (todo: Todo) => void;
  cancel: () => void;
};

export function TodoEditor({ title, todo, updateTodo, cancel }: Props) {
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateTodo({ ...todo, name, description });
  };

  return (
    <section className="todo-editor">
      <header>
        <h2>{title}</h2>
      </header>
      <form className="todo-editor-form" onSubmit={onSubmit}>
        <div className="input-group">
          <label className="input-label">
            <p>Name</p>
            <input
              name="todo-name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label className="input-label">
            <p>Description</p>
            <input
              name="todo-desc"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </label>
        </div>
        <div className="form-buttons">
          <button type="button" onClick={cancel}>
            Cancel
          </button>
          <button type="submit">Create</button>
        </div>
      </form>
    </section>
  );
}
