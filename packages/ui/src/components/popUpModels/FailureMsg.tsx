import { useEffect } from "react";
import { X } from "lucide-react";

export default function FailureMessage({
  open,
  msg,
  onClose,
  duration = 5000,
}: {
  open: boolean;
  msg: string;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-20 right-5 w-[300px] bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-2xl p-4 flex items-start gap-2 z-[9999]">
      <p className="flex-1 text-sm">{msg}</p>
      <button onClick={onClose} className="text-red-700 hover:text-red-900">
        <X size={18} />
      </button>
    </div>
  );
}
