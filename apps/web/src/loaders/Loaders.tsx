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

export const UserProfileSkeleton = () => {
  return (
    <div className="mx-30 p-10 my-10 min-h-screen">
      {/* first section */}
      <div className="flex justify-between items-center py-2 mb-10">
        <div className="flex gap-2 justify-center items-center">
          {/* Profile image */}
          <Shimmer className="w-30 h-30 rounded-full" />
          <div>
            {/* Username */}
            <Shimmer className="w-48 h-6 rounded mb-2" />
            {/* Bio */}
            <Shimmer className="w-64 h-4 rounded mb-2" />
            {/* Stats */}
            <div className="flex gap-4 items-center justify-center p-2 text-lg">
              <Shimmer className="w-20 h-5 rounded" />
              <Shimmer className="w-20 h-5 rounded" />
            </div>
          </div>
        </div>
        {/* Edit profile button */}
        <Shimmer className="w-32 h-10 rounded-3xl" />
      </div>
      {/* Divider */}
      <div className="border-gray-300 border-t-2 py-5" />
    </div>
  );
};

export const NoteSectionSkeleton = () => (
  <div className="mx-4 my-4 p-4 space-y-4">
    {/* first div - header */}
    <div className="flex justify-between items-center">
      <Shimmer className="h-8 w-40 rounded-lg" /> {/* Notes title */}
      <Shimmer className="h-8 w-32 rounded-3xl" /> {/* Leave Note button */}
    </div>

    {/* second div - stats */}
    <div className="flex gap-6">
      <Shimmer className="h-6 w-20 rounded-md" /> {/* liked */}
      <Shimmer className="h-6 w-24 rounded-md" /> {/* disliked */}
    </div>

    {/* third div - list of notes */}
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="p-2 flex gap-4 items-start">
          {/* user avatar */}
          <Shimmer className="w-12 h-12 rounded-full" />

          <div className="flex-1 space-y-2">
            {/* username */}
            <Shimmer className="h-4 w-32 rounded-md" />
            {/* note text */}
            <Shimmer className="h-3 w-full rounded-md" />
            <Shimmer className="h-3 w-5/6 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const RecipePageSkeleton = () => (
  <div className="m-5 px-5 py-4 space-y-6">
    {/* first section */}
    <div className="flex gap-5 my-4">
      {/* recipe image */}
      <div className="flex-1/2">
        <Shimmer className="h-[500px] w-full rounded-lg" />
      </div>

      {/* recipe raw data */}
      <div className="flex-1/2 p-5 space-y-4">
        {/* icons & buttons */}
        <div className="flex justify-between p-2">
          <div className="flex gap-5 items-center">
            <Shimmer className="h-8 w-8 rounded-full" />
            <Shimmer className="h-8 w-8 rounded-full" />
            <Shimmer className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex items-center gap-3">
            <Shimmer className="h-8 w-20 rounded-3xl" />
            <Shimmer className="h-8 w-20 rounded-3xl" />
          </div>
        </div>

        {/* user info */}
        <div className="flex items-center gap-2">
          <Shimmer className="w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Shimmer className="h-4 w-32 rounded-md" />
            <Shimmer className="h-3 w-20 rounded-md" />
          </div>
        </div>

        {/* title */}
        <Shimmer className="h-10 w-3/4 rounded-md" />

        {/* actions */}
        <div className="flex gap-10">
          <Shimmer className="h-6 w-20 rounded-md" />
          <Shimmer className="h-6 w-20 rounded-md" />
        </div>

        {/* description header */}
        <div className="flex justify-between py-3 border-t border-b border-gray-300">
          <Shimmer className="h-5 w-32 rounded-md" />
          <div className="flex gap-4">
            <Shimmer className="h-5 w-16 rounded-md" />
            <Shimmer className="h-5 w-16 rounded-md" />
          </div>
        </div>

        {/* description text */}
        <Shimmer className="h-16 w-full rounded-md" />
      </div>
    </div>

    {/* second section */}
    <div className="flex gap-5 my-4">
      {/* ingredients */}
      <div className="flex-1 p-4 space-y-4">
        <Shimmer className="h-6 w-32 rounded-md" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-3 items-center">
            <Shimmer className="w-10 h-10 rounded-md" />
            <div className="flex flex-col gap-1">
              <Shimmer className="h-4 w-24 rounded-md" />
              <Shimmer className="h-3 w-16 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* instructions */}
      <div className="flex-3 p-4 space-y-4">
        <Shimmer className="h-6 w-40 rounded-md" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Shimmer className="h-4 w-3/4 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
