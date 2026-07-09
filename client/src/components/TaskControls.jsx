import { Search } from "lucide-react";

function TaskControls({
  filters,
  filter,
  search,
  onFilterChange,
  onSearchChange,
}) {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
      <label className="relative block">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-3 font-semibold outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks"
          aria-label="Search tasks"
        />
      </label>

      <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-100 p-1">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`h-9 rounded-md px-3 text-sm font-black transition ${
              filter === item.id
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-600 hover:text-slate-950"
            }`}
            onClick={() => onFilterChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskControls;
