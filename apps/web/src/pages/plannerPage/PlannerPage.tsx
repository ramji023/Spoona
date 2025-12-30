import { useState } from "react";
import { CalendarComponent } from "./CelendarComponent";
import SetPlan from "./SetPlan";
import { useFetchPlanners } from "../../react_queries/queries";
import { useAuthStore } from "../../stores/authStore";
import useMinLoader from "../../hooks/useMinLoader";
import Err from "../../errors/ErrorBoundary";
import { useFailureMsgStore } from "../../stores/failureMsgStore";
import { PlannerPageSkeleton } from "../../loaders/Loaders";

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function PlannerPage() {
  const [calendarValue, setValue] = useState<Value>(new Date());

  const setFailureMsg = useFailureMsgStore((s) => s.setFailureMsg);
  const id = useAuthStore((s) => s.id);
  const query = useFetchPlanners(id);
  const { data, isLoading, error } = useMinLoader({ query, loadingTime: 800 });
  if (isLoading) {
    return <PlannerPageSkeleton />;
  }

  if (error) {
    setFailureMsg("Something went wrong while fetching your food planners");
    return <Err />;
  }
  if (data) {
    return (
      <>
        <div className="mx-20 p-10 flex gap-4 my-10">
          {/* calendar div  */}
          <div className="flex-1/2 p-4">
            <CalendarComponent
              calendarValue={calendarValue}
              setValue={setValue}
            />
          </div>
          {/* planner div  */}
          <div className="flex-1/2 p-4">
            <SetPlan value={calendarValue} data={data} />
          </div>
        </div>
      </>
    );
  }
  return null;
}
