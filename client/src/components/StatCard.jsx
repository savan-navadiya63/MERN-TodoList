function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-bold uppercase text-slate-500">{label}</p>
    </div>
  );
}

export default StatCard;
