import { useEffect } from "react";
import { X } from "lucide-react";

export default function SuccessMessage({
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
    <div className="fixed top-20 right-5 w-[300px] bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-2xl p-4 flex items-start gap-2 z-[9999]">
      <p className="flex-1 text-sm">{msg}</p>
      <button onClick={onClose} className="text-green-700 hover:text-green-900">
        <X size={18} />
      </button>
    </div>
  );
}
