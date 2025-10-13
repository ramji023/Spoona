import { motion } from "motion/react";

export const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <motion.div
        className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        className="mt-4 text-lg font-semibold text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        Recipes are cooking...
      </motion.p>
    </div>
  );
};

export const Spinner = () => {
  return (
    <motion.div
      className="border-3 border-t-transparent border-white rounded-full"
      style={{ width: 20, height: 20 }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      }}
    />
  );
};

interface ShimmerProps {
  className?: string;
}

const Shimmer = ({ className = "" }: ShimmerProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base gray background */}
      <div className="bg-gray-200 w-full h-full rounded" />

      {/* Moving gradient */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
    </div>
  );
};

export const CommunityCardSkeleton = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => (
  <div className={`${width} flex flex-col items-center cursor-pointer`}>
    {/* Image Skeleton */}
    <div className={`w-full ${height} relative rounded-2xl overflow-hidden`}>
      <Shimmer className="w-full h-full rounded-2xl" />

      {/* Avatar placeholders */}
      <div className="absolute bottom-1 left-1 flex -space-x-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Shimmer
            key={i}
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        ))}

        {/* Extra count placeholder */}
        <Shimmer className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 text-sm flex items-center justify-center" />
      </div>
    </div>

    {/* Community name placeholder */}
    <div className="mt-3 text-center w-full">
      <Shimmer className="h-4 w-3/4 rounded mx-auto" />
    </div>
  </div>
);

export const RecipeCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center w-[250px]">
      {/* Image skeleton */}
      <div className="relative w-full h-[300px] overflow-hidden rounded-2xl">
        <Shimmer className="w-full h-full rounded-2xl" />

        {/* Likes & Save icons skeleton */}
        <div className="absolute left-2 top-2 flex items-center gap-1">
          <Shimmer className="w-6 h-6 rounded-full" />
          <Shimmer className="w-8 h-4 rounded" />
        </div>
        <div className="absolute right-2 top-2">
          <Shimmer className="w-6 h-6 rounded-full" />
        </div>

        {/* User avatar skeleton */}
        <div className="absolute bottom-1 left-1 flex items-center gap-2">
          {Array.from({ length: 1 }).map((_, i) => (
            <Shimmer
              key={i}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          ))}
          <Shimmer className="h-4 w-20 rounded" />
        </div>

        {/* Circle icon skeleton */}
        <div className="absolute right-2 bottom-2">
          <Shimmer className="w-6 h-6 rounded-full" />
        </div>
      </div>

      {/* Title and cook time */}
      <div className="mt-3 flex justify-between items-center w-full">
        <Shimmer className="h-5 w-3/4 rounded" />
        <Shimmer className="h-4 w-10 rounded" />
      </div>
    </div>
  );
};


export const CommunityPageSkeleton = () => {
  return (
    <div className="mx-40 my-8 p-2 animate-fadeIn min-h-screen">
      {/* First Section (Banner + Buttons) */}
      <div className="relative">
        <Shimmer className="h-[200px] w-full rounded-lg" />

        <div className="absolute bottom-2 left-2 flex items-center gap-3">
          <Shimmer className="w-10 h-10 rounded-full" />
          <Shimmer className="h-8 w-48 rounded-md" />
        </div>

        <div className="absolute bottom-2 right-4 flex items-center gap-3">
          <Shimmer className="w-20 h-10 rounded-3xl" />
          <Shimmer className="w-10 h-10 rounded-full" />
          <Shimmer className="w-10 h-10 rounded-full" />
        </div>
      </div>

      {/* Second Section (Stats + Button) */}
      <div className="flex justify-between items-center p-4 mt-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Shimmer className="w-5 h-5 rounded-full" />
            <Shimmer className="w-24 h-4 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <Shimmer className="w-5 h-5 rounded-full" />
            <Shimmer className="w-24 h-4 rounded-md" />
          </div>
        </div>
        <Shimmer className="w-32 h-10 rounded-3xl" />
      </div>

      {/* Third Section (Description) */}
      <div className="px-4">
        <Shimmer className="h-3 w-full mb-2 rounded-md" />
        <Shimmer className="h-3 w-3/4 mb-2 rounded-md" />
        <Shimmer className="h-3 w-1/2 rounded-md" />
      </div>

      {/* Fourth Section (Search bar + Filter) */}
      <div className="my-3 flex items-center gap-3 justify-center">
        <Shimmer className="w-[90%] h-[45px] rounded-4xl" />
        <Shimmer className="w-16 h-[45px] rounded-3xl" />
      </div>
    </div>
  );
};