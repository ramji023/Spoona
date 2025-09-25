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
