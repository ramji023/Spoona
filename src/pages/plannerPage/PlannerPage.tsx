import { useState } from "react";
import { CalendarComponent } from "../../components/CelendarComponent";
import SetPlan from "./SetPlan";

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function PlannerPage() {
  const [calendarValue, setValue] = useState<Value>(new Date());
  return (
    <>
      <div className="mx-20 p-10 flex gap-4">
        {/* calendar div  */}
        <div className="flex-1/2 p-4">
          <CalendarComponent
            calendarValue={calendarValue}
            setValue={setValue}
          />
        </div>
        {/* planner div  */}
        <div className="flex-1/2 p-4">
          <SetPlan value={calendarValue} />
        </div>
      </div>
    </>
  );
}
