import { RefreshCw } from "lucide-react";

function TaskHeader({ onRefresh }) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-500">
          Manage your daily work
        </p>
        <h2 className="mt-1 text-2xl font-black tracking-normal">Tasks</h2>
      </div>
      <button
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-bold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
        type="button"
        onClick={onRefresh}
      >
        <RefreshCw size={16} />
        Refresh
      </button>
    </div>
  );
}

export default TaskHeader;
