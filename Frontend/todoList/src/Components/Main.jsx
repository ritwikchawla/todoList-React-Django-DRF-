import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import InputArea from "./InputArea";

function Main() {
  const [todoList, setTodoList] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTodosApi = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/todos");
      setTodoList(res.data);
    } catch (error) {
      console.log("Cannot fetch Todos Api", error);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`http://localhost:8000/api/todo/${todoId}`);
      fetchTodosApi();
    } catch (error) {
      console.log("Cannot delete TodoItem", error);
    }
  };

  const handleAdd = async (title, description) => {
    try {
      await axios.post("http://localhost:8000/api/todos/", {
        title: title,
        description: description,
      });
      fetchTodosApi();
    } catch (error) {
      console.log("Cannot add Todo", error);
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleUpdate = async (todoId) => {
    try {
      await axios.put(`http://localhost:8000/api/todo/${todoId}`, {
        title: editTitle,
        description: editDescription,
      });
      setEditingTodo(null);
      fetchTodosApi();
    } catch (error) {
      console.log("Cannot update TodoItem", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  useEffect(() => {
    fetchTodosApi();
  }, []);

  return (
    <main className="flex-grow-1 py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* INPUT-AREA */}
            <InputArea onAdd={handleAdd} />

            {/* Todo List */}
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">My Todos</h5>
              </div>
              <ul className="list-group list-group-flush">
                {todoList.map((v) => (
                  <li key={v.id} className="list-group-item todo-item">
                    {editingTodo === v.id ? (
                      <div className="edit-form">
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                          className="form-control mb-2"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          rows="3"
                        />
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleUpdate(v.id)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="todo-content">
                          <h5 className="todo-title mb-1">{v.title}</h5>
                          <p className="todo-description text-muted mb-0">
                            {v.description}
                          </p>
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary align-self-center"
                            aria-label="Edit todo"
                            onClick={() => handleEditClick(v)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger align-self-center"
                            aria-label="Delete todo"
                            onClick={() => handleDelete(v.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
