-- AddForeignKey
ALTER TABLE "Planner" ADD CONSTRAINT "Planner_food_fkey" FOREIGN KEY ("food") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
