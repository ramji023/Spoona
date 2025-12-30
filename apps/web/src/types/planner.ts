export type PlannerInput = {
  date: Date;
  type: string;
  foodUrl?: string;
  food?: string;
};

export type PlannerData = {
  date: string;
  type: string;
  foodUrl?: string;
  foodData?: {
    id: string;
    title: string;
    imageUrl: string;
  };
};
