import salmonImage from "../../public/recipe_categories/Salmon.jpeg";
import breadImage from "../../public/recipe_categories/bread.jpg";
import breakFastImage from "../../public/recipe_categories/breakFast.jpeg";
import cakeImage from "../../public/recipe_categories/cake.jpeg";
import ketoImage from "../../public/recipe_categories/keto.jpeg";
import pastaImage from "../../public/recipe_categories/pasta.jpeg";
import saladImage from "../../public/recipe_categories/salad.jpeg";
import healthyImage_1 from "../../public/recipe_categories/healthy_1.jpeg";
const recipeCategories = [
  {
    categoryName: "Salmon",
    imagePath: salmonImage,
  },
  {
    categoryName: "Bread",
    imagePath: breadImage,
  },
  {
    categoryName: "Breakfast",
    imagePath: breakFastImage,
  },
  {
    categoryName: "Healthy",
    imagePath: healthyImage_1,
  },
  {
    categoryName: "Keto",
    imagePath: ketoImage,
  },
  {
    categoryName: "Pasta",
    imagePath: pastaImage,
  },
  // {
  //   categoryName: "Salad",
  //   imagePath: saladImage,
  // },
  // {
  //   categoryName: "Cake",
  //   imagePath: cakeImage,
  // },
];

export function CategoryCard(props:any) {
  return (
    <>
      <div className="cursor-pointer relative w-[150px] h-[150px] overflow-hidden rounded-2xl group">
        <img
          src={props.category?.imagePath}
          alt={props.category?.categoryName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ease-in-out"
        />
        <div className="absolute bottom-0 w-full text-center text-white group-hover:text-orange-400 font-semibold">
          {props.category?.categoryName}
        </div>
      </div>
    </>
  );
}

export function CategorySection() {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        {recipeCategories.map((category, index) => (
          <CategoryCard category={category} key={index} />
        ))}
      </div>
    </>
  );
}
