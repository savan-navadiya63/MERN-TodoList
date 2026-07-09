import { ClipboardList } from "lucide-react";
import StatCard from "./StatCard.jsx";

function AppSidebar({ stats }) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase text-emerald-700">
            MERN Workspace
          </p>
          <h1 className="mt-1 text-3xl font-black tracking-normal">
            Todo List
          </h1>
        </div>
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-slate-950 text-white">
          <ClipboardList size={25} />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between text-sm font-bold text-slate-700">
          <span>Completion</span>
          <span>{stats.progress}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Active" value={stats.active} />
        <StatCard label="Done" value={stats.completed} />
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 p-3">
        <p className="text-sm font-bold text-slate-900">Database</p>
        <p className="mt-1 text-sm text-slate-600">
          MongoDB Atlas connected through Express API.
        </p>
      </div>
    </aside>
  );
}

export default AppSidebar;
