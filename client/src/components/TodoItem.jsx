import { Check, Circle, Pencil, Trash2, X } from "lucide-react";
import IconButton from "./IconButton.jsx";
import { formatDate } from "../utils/formatDate.js";

function TodoItem({
  todo,
  editingId,
  editingTitle,
  onEditingTitleChange,
  onStartEditing,
  onCancelEditing,
  onSaveEdit,
  onToggleTodo,
  onDeleteTodo,
}) {
  const isEditing = editingId === todo._id;

  return (
    <article className="grid grid-cols-[42px_1fr] gap-3 rounded-lg border border-slate-200 bg-white p-3 transition hover:border-slate-300 hover:shadow-sm sm:grid-cols-[42px_1fr_auto] sm:items-center">
      <button
        className={`grid h-10 w-10 place-items-center rounded-lg border transition ${
          todo.completed
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-slate-300 text-slate-500 hover:border-emerald-300 hover:text-emerald-700"
        }`}
        type="button"
        onClick={() => onToggleTodo(todo)}
        aria-label={todo.completed ? "Mark active" : "Mark complete"}
        title={todo.completed ? "Mark active" : "Mark complete"}
      >
        {todo.completed ? <Check size={18} /> : <Circle size={18} />}
      </button>

      <div className="min-w-0">
        {isEditing ? (
          <input
            className="h-10 w-full rounded-lg border border-slate-300 px-3 font-semibold outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
            value={editingTitle}
            onChange={(event) => onEditingTitleChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") onSaveEdit(todo);
              if (event.key === "Escape") onCancelEditing();
            }}
            autoFocus
            maxLength={120}
            aria-label="Edit todo"
          />
        ) : (
          <>
            <p
              className={`break-words font-bold ${
                todo.completed ? "text-slate-400 line-through" : "text-slate-900"
              }`}
            >
              {todo.title}
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-400">
              {formatDate(todo.createdAt)}
            </p>
          </>
        )}
      </div>

      <div className="col-start-2 flex gap-2 sm:col-start-auto">
        {isEditing ? (
          <>
            <IconButton label="Save todo" onClick={() => onSaveEdit(todo)}>
              <Check size={17} />
            </IconButton>
            <IconButton label="Cancel editing" onClick={onCancelEditing}>
              <X size={17} />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton label="Edit todo" onClick={() => onStartEditing(todo)}>
              <Pencil size={16} />
            </IconButton>
            <IconButton
              label="Delete todo"
              onClick={() => onDeleteTodo(todo._id)}
              danger
            >
              <Trash2 size={16} />
            </IconButton>
          </>
        )}
      </div>
    </article>
  );
}

export default TodoItem;
