import React from "react";
type DropDownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  communities: { id: string; name: string }[];
  text: string;
  boxSize: string;
  error?: string;
};

// dropdown component where show all the user community
export const DropDown = React.forwardRef<HTMLSelectElement, DropDownProps>(
  ({ communities, text, boxSize, error, ...rest }, ref) => {
    return (
      <div className="flex justify-center mt-10">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">{text}</label>
          <select
            ref={ref}
            className={`${boxSize} px-5 py-3 outline-1 outline-gray-300 rounded bg-gray-200 focus:outline-orange-400`}
            {...rest}
          >
            <option value="everyone">Everyone (visible to everyone)</option>
            {communities.map((community) => (
              <option key={community.id} value={community.id}>
                {community.name}
              </option>
            ))}
          </select>
          <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
            {error ?? ""}
          </span>
        </div>
      </div>
    );
  }
);

DropDown.displayName = "DropDown";
