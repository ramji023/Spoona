import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-8xl font-bold text-orange-400 mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Oops! Page not found
        </h2>
        <p className="text-gray-500 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-orange-400 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span>Go Back Home</span>
            <MoveRight />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
