export function CategoryCard({ categoryName, imagePath }: { categoryName: string; imagePath: string }) {
  return (
    <div className="cursor-pointer relative w-[150px] h-[150px] overflow-hidden rounded-2xl group">
      <img
        src={imagePath}
        alt={categoryName}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ease-in-out"
      />
      <div className="absolute bottom-0 w-full text-center text-white group-hover:text-orange-400 font-semibold">
        {categoryName}
      </div>
    </div>
  );
}

export function CategorySection({ categories }: { categories: Record<string, string> }) {
  return (
    <div className="flex flex-wrap justify-start gap-6">
      {Object.entries(categories).map(([categoryName, imagePath], index) => (
        <CategoryCard key={index} categoryName={categoryName} imagePath={imagePath} />
      ))}
    </div>
  );
}
