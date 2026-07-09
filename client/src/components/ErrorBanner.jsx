import { AlertCircle } from "lucide-react";

function ErrorBanner({ message }) {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-800">
      <AlertCircle className="mt-0.5 shrink-0" size={18} />
      <span>{message}</span>
    </div>
  );
}

export default ErrorBanner;
