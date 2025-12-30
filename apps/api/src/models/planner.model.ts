import { prisma } from "@repo/database";
import { ApiError } from "../utils/customError";

interface PlannerDataType {
  userId: string;
  date: Date;
  type: string;
  food?: string;
  foodUrl?: string;
}
// model function to create planner
export const createPlanner = async (plannerData: PlannerDataType) => {
  try {
    return await prisma.planner.create({ data: plannerData });
  } catch (err) {
    throw new ApiError("Something went wrong while creating planner", 404);
  }
};

// model  function to fetch planner for that user
export const fetchPlanner = async (id: string) => {
  try {
    return await prisma.planner.findMany({
      where: { userId: id },
      select: {
        type: true,
        date: true,
        foodUrl: true,
        foodData: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
      },
    });
  } catch (err) {
    throw new ApiError("Something went wrong while fetching planner data", 404);
  }
};
