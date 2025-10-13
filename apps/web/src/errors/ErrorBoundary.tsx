import { motion } from "motion/react";
import { RefreshCcw, Home } from "lucide-react";
import { Link } from "react-router-dom";
export default function Err() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-orange-400 mb-4">Oops!</h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
          Something went wrong
        </h2>
        <p className="text-gray-500 mb-6">
          We’re sorry — an unexpected error occurred.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className=" cursor-pointer flex items-center gap-2 bg-orange-400 text-white font-semibold py-2 px-5 rounded-xl transition-all duration-300"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white font-semibold py-2 px-5 rounded-xl transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
