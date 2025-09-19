export default function FloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed overflow-hidden bottom-5 right-5 z-20">
      <button
        onClick={onClick}
        className={`text-white font-bold rounded-3xl px-6 py-2 cursor-pointer bg-orange-400 transition-all duration-300 ease-out hover:text-xl
        `}
      >
        Add Recipe
      </button>
    </div>
  );
}

/*
import { useEffect, useState } from "react";

export default function FloatingButton() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLarge((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed overflow-hidden bottom-5 right-5 z-20">
      <button
        className={`text-white font-bold rounded-3xl px-6 py-2 transition-all duration-700 ease-in-out cursor-pointer
        ${isLarge ? "text-xl bg-orange-500" : "text-base bg-purple-500"}
        `}
      >
        Add Recipe
      </button>
    </div>
  );
}


*/
