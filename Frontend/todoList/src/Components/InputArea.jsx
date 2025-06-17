import { FaPlus } from "react-icons/fa";
import { useState } from "react";

function InputArea(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await props.onAdd(title, description);
      // Clear form on successful add
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add todo", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Add New Todo</h5>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title*"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
            <textarea
              className="form-control"
              placeholder="Description (optional)"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="col-md-4 d-flex align-items-start">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <FaPlus className="me-2" />
              )}
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputArea;
