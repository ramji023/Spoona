import { motion } from "motion/react";

export const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Background pattern - subtle food dots */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(25,95%,53%) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Main loader container */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Cooking pot with steam */}
        <div className="relative w-32 h-32">
          {/* Steam particles */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute w-3 h-3 rounded-full bg-[hsl(25,95%,53%)]/30"
              style={{
                left: `${30 + index * 20}%`,
                bottom: "75%",
              }}
              animate={{
                y: [-10, -40, -60],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Pot lid */}
          <motion.div
            className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-3 bg-[hsl(25,95%,53%)] rounded-full shadow-md"
            animate={{
              y: [0, -4, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Lid handle */}
          <motion.div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[hsl(25,95%,53%)] rounded-full shadow-sm"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Pot body */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-14 bg-gradient-to-b from-[hsl(25,95%,53%)] to-[hsl(25,95%,53%)]/80 rounded-b-3xl rounded-t-lg shadow-lg" />

          {/* Pot handles */}
          <div className="absolute bottom-10 left-1 w-4 h-3 bg-[hsl(25,95%,53%)] rounded-l-full shadow-sm" />
          <div className="absolute bottom-10 right-1 w-4 h-3 bg-[hsl(25,95%,53%)] rounded-r-full shadow-sm" />

          {/* Stirring spoon */}
          <motion.div
            className="absolute bottom-8 left-1/2 origin-bottom"
            animate={{
              rotate: [-15, 15, -15],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-2 h-12 bg-amber-700 rounded-full -translate-x-1/2" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-5 bg-amber-800 rounded-full" />
          </motion.div>
        </div>

        {/* Bouncing ingredients */}
        <div className="flex items-center gap-3">
          {["🍅", "🧅", "🥕"].map((emoji, index) => (
            <motion.span
              key={index}
              className="text-2xl"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* Loading text */}
        <motion.p
          className="text-[hsl(0,0%,45%)] font-medium tracking-wide text-sm"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Cooking up something delicious...
        </motion.p>

        {/* Progress bar styled as a cutting board */}
        <div className="w-48 h-2 bg-amber-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-[hsl(25,95%,53%)] via-orange-400 to-[hsl(25,95%,53%)] rounded-full"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
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

// skeleton for showing popular creators
export const UserCardSkeleton = () => {
  return (
    <div className="cursor-pointer w-[150px] h-[150px] rounded-2xl border border-gray-300 flex flex-col items-center justify-around">
      {/* Avatar Skeleton */}
      <div className="overflow-hidden w-[90px] h-[90px] rounded-full bg-gray-200">
        <motion.div
          className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Name Skeleton */}
      <div className="w-3/4 h-4 bg-gray-200 rounded overflow-hidden">
        <motion.div
          className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
};

// skeleton for showing saved recipe page
export function SavedRecipesSkeleton() {
  return (
    <div className="mx-20 p-10 flex flex-col gap-4">
      {/* First div - Header skeleton */}
      <div className="flex justify-between my-2">
        <div className="flex items-center gap-1">
          <motion.div
            className="w-6 h-6 bg-gray-200 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="w-32 h-9 bg-gray-200 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          />
        </div>

        <motion.div
          className="w-24 h-10 bg-gray-200 rounded-3xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
      </div>

      {/* Second div - Search bar skeleton */}
      <div className="my-3 flex items-center gap-3">
        <motion.div
          className="w-[90%] h-[45px] bg-gray-200 rounded-4xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        />
        <motion.div
          className="w-[45px] h-[45px] bg-gray-200 rounded-3xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>

      <div className="my-3 border border-solid border-gray-300"></div>

      {/* Third div - Recipes header skeleton */}
      <div className="my-3">
        <div className="flex justify-between items-center">
          <motion.div
            className="w-24 h-7 bg-gray-200 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="w-16 h-6 bg-gray-200 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          />
        </div>
      </div>

      {/* Fourth div - Recipe cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <motion.div
            key={item}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: item * 0.1 }}
          >
            {/* Image skeleton */}
            <motion.div
              className="w-full h-48 bg-gray-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: item * 0.1,
              }}
            />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              {/* Title skeleton */}
              <motion.div
                className="h-6 bg-gray-200 rounded w-3/4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: item * 0.1 + 0.2,
                }}
              />

              {/* Cook time skeleton */}
              <motion.div
                className="h-4 bg-gray-200 rounded w-1/2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: item * 0.1 + 0.3,
                }}
              />

              {/* Tags skeleton */}
              <div className="flex gap-2">
                <motion.div
                  className="h-6 w-16 bg-gray-200 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: item * 0.1 + 0.4,
                  }}
                />
                <motion.div
                  className="h-6 w-20 bg-gray-200 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: item * 0.1 + 0.5,
                  }}
                />
              </div>

              {/* User info skeleton */}
              <div className="flex items-center gap-2 pt-2">
                <motion.div
                  className="w-8 h-8 bg-gray-200 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: item * 0.1 + 0.6,
                  }}
                />
                <motion.div
                  className="h-4 bg-gray-200 rounded w-24"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: item * 0.1 + 0.7,
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
