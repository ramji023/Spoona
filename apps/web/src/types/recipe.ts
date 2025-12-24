export interface Recipe {
  title: string;
  description: string;
  cookTime: string;
  prepTime: string;
  imageUrl: string;
  ingredients: {
    name: string;
    quantity: string;
  }[];
  instructions: {
    step: string;
  }[];
  user: {
    username: string;
    profileImage: string | null;
  };
}

export interface Recipes {
  id: string;
  title: string;
  cookTime: string;
  imageUrl: string;
  tags: string[];
  cuisines: string[];
  categories: string[];
  user: {
    username: string;
    profileImage: string | null;
  };
}

export interface SavedRecipe {
  recipe: Recipes;
}

export interface RecipeFilter {
  diet: readonly ["Vegetarian", "Non-vageterian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo", "Low-Carb", "High-Protein", "Pescatarian", "Whole30", "Mediterranean", "Low-Fat", "Diabetic-Friendly", "Nut-Free", "Halal", "Kosher", "Low-Sodium", "Sugar-Free", "Lactose-Free", "Egg-Free", "Soy-Free", "Raw Food", "Flexitarian", "DASH Diet", "Anti-Inflammatory"];
  categories: readonly ["Non-vageterian" | "Breakfast" | "Lunch" | "Dinner" | "Brunch" | "Appetizers" | "Main Course" | "Side Dish" | "Salads" | "Soups" | "Stews" | "Desserts" | "Beverages" | "Snacks" | "Baked Goods" | "Pasta" | "Seafood" | "Poultry" | "Beef" | "Pork" | "Lamb" | "Vegetarian Mains" | "Vegan Mains" | "Sandwiches" | "Pizza" | "Burgers" | "Tacos" | "Casseroles" | "Stir-Fry" | "Grilled" | "BBQ" | "Slow Cooker" | "Instant Pot" | "One-Pot Meals" | "Quick & Easy"];
  cuisines: readonly["Mediterranean" | "American" | "Italian" | "Mexican" | "Chinese" | "Japanese" | "Indian" | "Thai" | "French" | "Greek" | "Spanish" | "Middle Eastern" | "Korean" | "Vietnamese" | "Caribbean" | "Brazilian" | "Turkish" | "Lebanese" | "Moroccan" | "German" | "British" | "Irish" | "African" | "Cajun" | "Southern" | "Tex-Mex" | "Asian Fusion" | "Latin American" | "Scandinavian" | "Eastern European"];
}


export type RecipeForm = {
  community: string;
  title: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  instructions: { step: string }[];
  prepHours: string;
  prepMinutes: string;
  cookHours: string;
  cookMinutes: string;
  imageUrl?: string;
  cuisines?: string;
  categories?: string;
  diets?: string;
};