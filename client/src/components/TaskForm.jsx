import { Plus } from "lucide-react";

function TaskForm({ title, titleError, saving, onTitleChange, onSubmit }) {
  return (
    <form className="mt-5" onSubmit={onSubmit}>
      <div className="grid grid-cols-[1fr_48px] gap-3">
        <input
          className={`h-12 rounded-lg border px-4 font-semibold outline-none transition placeholder:text-slate-400 focus:ring-4 ${
            titleError
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-slate-950 focus:ring-slate-200"
          }`}
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Add a new task..."
          maxLength={120}
          aria-label="New todo"
          aria-invalid={titleError ? "true" : "false"}
          aria-describedby={titleError ? "todo-title-error" : undefined}
        />
        <button
          className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          type="submit"
          disabled={saving}
          aria-label="Add todo"
          title="Add todo"
        >
          <Plus size={20} />
        </button>
      </div>

      {titleError && (
        <p id="todo-title-error" className="mt-2 text-sm font-bold text-red-600">
          {titleError}
        </p>
      )}
    </form>
  );
}

export default TaskForm;
