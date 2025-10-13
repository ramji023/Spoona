import Calendar from "react-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type propType = {
  calendarValue: Value;
  setValue: React.Dispatch<React.SetStateAction<Value>>;
};
export const CalendarComponent = (props: propType) => {
  return (
    <>
      <div className="max-w-md w-full p-6 bg-white rounded-2xl font-poppins">
        <Calendar
          onChange={props?.setValue}
          value={props?.calendarValue}
          className="!border-none !w-full"
          view="month"
          prevLabel={<ChevronLeft className="w-5 h-5 text-gray-600" />}
          nextLabel={<ChevronRight className="w-5 h-5 text-gray-600" />}
          prev2Label={null}
          next2Label={null}
          tileClassName={({ view }) =>
            view === "month"
              ? "h-12 w-12 flex items-center justify-center  transition-colors relative font-inter"
              : null
          }
          tileContent={({ date, view }) => {
            const isCurrentDate =
              props.calendarValue instanceof Date
                ? date.toDateString() === props.calendarValue.toDateString()
                : false;

            return view === "month" ? (
              <div
                className={`absolute inset-0 flex items-center justify-center 
      ${
        isCurrentDate
          ? "bg-orange-400 text-white hover:bg-orange-300 rounded-full"
          : ""
      }
      ${date.getDay() === 0 ? "text-red-400" : "text-gray-700"}
      font-medium`}
              >
                {date.getDate()}
              </div>
            ) : null;
          }}
          formatShortWeekday={(_, date) =>
            ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
          }
        />
      </div>
    </>
  );
};
