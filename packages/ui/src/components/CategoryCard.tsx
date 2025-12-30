export function CategoryCard({
  categoryName,
  imagePath,
  onMove,
}: {
  categoryName: string;
  imagePath: string;
  onMove: (path: string, value: any) => void;
}) {
  return (
    <div
      onClick={() => {
        onMove("/home", { id: "meal", item: categoryName });
      }}
      className="cursor-pointer relative w-[150px] h-[150px] overflow-hidden rounded-2xl group"
    >
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
