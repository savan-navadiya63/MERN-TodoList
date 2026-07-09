import { useEffect, useMemo, useState } from "react";
import AppSidebar from "./components/AppSidebar.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";
import TaskControls from "./components/TaskControls.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskHeader from "./components/TaskHeader.jsx";
import TaskList from "./components/TaskList.jsx";
import { buildApiUrl } from "./config/api.js";

const filters = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");

  const stats = useMemo(() => {
    const completed = todos.filter((todo) => todo.completed).length;
    const total = todos.length;

    return {
      total,
      completed,
      active: total - completed,
      progress: total ? Math.round((completed / total) * 100) : 0,
    };
  }, [todos]);

  const visibleTodos = useMemo(() => {
    const cleanSearch = search.trim().toLowerCase();

    return todos
      .filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
      })
      .filter((todo) => todo.title.toLowerCase().includes(cleanSearch));
  }, [filter, search, todos]);

  useEffect(() => {
    loadTodos();
  }, []);

  async function request(path, options) {
    const response = await fetch(buildApiUrl(path), {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.message || "Request failed");
    }

    if (response.status === 204) return null;
    return response.json();
  }

  async function loadTodos() {
    try {
      setLoading(true);
      setError("");
      const data = await request("/api/todos");
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(event) {
    event.preventDefault();
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setTitleError("Please enter a task before adding.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setTitleError("");
      const todo = await request("/api/todos", {
        method: "POST",
        body: JSON.stringify({ title: cleanTitle }),
      });
      setTodos((current) => [todo, ...current]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleTodo(todo) {
    try {
      setError("");
      const updated = await request(`/api/todos/${todo._id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !todo.completed }),
      });
      setTodos((current) =>
        current.map((item) => (item._id === updated._id ? updated : item))
      );
    } catch (err) {
      setError(err.message);
    }
  }

  function startEditing(todo) {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
  }

  async function saveEdit(todo) {
    const cleanTitle = editingTitle.trim();
    if (!cleanTitle) return;

    try {
      setError("");
      const updated = await request(`/api/todos/${todo._id}`, {
        method: "PATCH",
        body: JSON.stringify({ title: cleanTitle }),
      });
      setTodos((current) =>
        current.map((item) => (item._id === updated._id ? updated : item))
      );
      cancelEditing();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTodo(id) {
    try {
      setError("");
      await request(`/api/todos/${id}`, { method: "DELETE" });
      setTodos((current) => current.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function cancelEditing() {
    setEditingId(null);
    setEditingTitle("");
  }

  function handleTitleChange(value) {
    setTitle(value);
    if (titleError && value.trim()) {
      setTitleError("");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[340px_1fr] lg:px-8">
        <AppSidebar stats={stats} />

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <TaskHeader onRefresh={loadTodos} />
          <TaskForm
            title={title}
            titleError={titleError}
            saving={saving}
            onTitleChange={handleTitleChange}
            onSubmit={addTodo}
          />
          <TaskControls
            filters={filters}
            filter={filter}
            search={search}
            onFilterChange={setFilter}
            onSearchChange={setSearch}
          />

          {error && <ErrorBanner message={error} />}

          <TaskList
            todos={visibleTodos}
            loading={loading}
            editingId={editingId}
            editingTitle={editingTitle}
            onEditingTitleChange={setEditingTitle}
            onStartEditing={startEditing}
            onCancelEditing={cancelEditing}
            onSaveEdit={saveEdit}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />
        </section>
      </section>
    </main>
  );
}

export default App;
