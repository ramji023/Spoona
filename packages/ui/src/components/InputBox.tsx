import { CameraIcon } from "../icons/CameraIcon";

import React from "react";
import { CrossIcon } from "../icons/CrossIcon";

/* ---------------- InputBox ---------------- */
type InputBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  text: string;
  boxSize: string;
  error?: string;
  onRemove?: () => void;
  index?: number;
};

export const InputBox = React.forwardRef<HTMLInputElement, InputBoxProps>(
  ({ text, placeholder, error, onRemove, index, boxSize, ...rest }, ref) => {
    return (
      <div className="flex justify-center mt-10 relative">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">{text}</label>
          <input
            ref={ref}
            placeholder={placeholder}
            className={`${boxSize} px-5 py-3 outline-1 outline-gray-300 rounded bg-gray-200 focus:outline-orange-400`}
            {...rest}
          />
          <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
            {error ?? ""}
          </span>
        </div>
        {onRemove && index !== 0 && (
          <div className="absolute top-2 right-50 z-10">
            <div onClick={onRemove} className="cursor-pointer text-gray-400">
              <CrossIcon />
            </div>
          </div>
        )}
      </div>
    );
  }
);
InputBox.displayName = "InputBox";

/* ---------------- TextAreaBox ---------------- */
type TextAreaBoxProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  text: string;
  boxSize: string;
  error?: string;
};

export const TextAreaBox = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaBoxProps
>(({ text, placeholder, error, boxSize, ...rest }, ref) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col">
        <label className="text-lg font-semibold mb-2">{text}</label>
        <textarea
          ref={ref}
          placeholder={placeholder}
          rows={3}
          className={`${boxSize} px-5 py-3 outline-1 outline-gray-300 rounded bg-gray-200 focus:outline-orange-400`}
          {...rest}
        />
        <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
          {error ?? ""}
        </span>
      </div>
    </div>
  );
});
TextAreaBox.displayName = "TextAreaBox";

