import type { UseFormRegisterReturn } from "react-hook-form";
import { CrossIcon } from "@repo/ui/icons/CrossIcon";

type InputBoxVariantProps = {
  text: string;
  size: string;
  firstField: UseFormRegisterReturn;
  secondField: UseFormRegisterReturn;
  firstError?: string;
  secondError?: string;
  firstLabel: string;
  secondLabel: string;
  firstPlaceholder: string;
  secondPlaceholder: string;
  onRemove?: () => void;
  index?: number;
};

export function InputBoxVariant({
  text,
  size,
  firstField,
  secondField,
  firstError,
  secondError,
  firstLabel,
  secondLabel,
  firstPlaceholder,
  secondPlaceholder,
  onRemove,
  index,
}: InputBoxVariantProps) {
  return (
    <div className="flex justify-center mt-10 relative">
      <div className={`${size} flex flex-col`}>
        <label className="text-lg font-semibold mb-4">{text}</label>
        <div className="flex justify-between gap-4">
          {/* Hours */}
          <div className="flex flex-col w-1/2">
            <div className="flex items-center bg-gray-200 rounded outline-1 outline-gray-300 px-3 focus-within:outline-orange-400">
              <label className="text-lg text-gray-500 mr-2 whitespace-nowrap">
                {firstLabel}
              </label>
              <input
                type="text"
                placeholder={firstPlaceholder}
                {...firstField}
                className="w-full py-3 text-lg bg-gray-200 outline-none text-black"
              />
            </div>
            <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
              {firstError ?? ""}
            </span>
          </div>
          {/* Minutes */}
          <div className="flex flex-col w-1/2">
            <div className="flex items-center bg-gray-200 rounded outline-1 outline-gray-300 px-3 focus-within:outline-orange-400">
              <label className="text-lg text-gray-500 mr-2 whitespace-nowrap">
                {secondLabel}
              </label>
              <input
                type="text"
                placeholder={secondPlaceholder}
                {...secondField}
                className="w-full py-3 text-lg bg-gray-200 outline-none text-black"
              />
            </div>
            <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
              {secondError ?? ""}
            </span>
          </div>
        </div>
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

// <---------------- Box ---------------- */
import React, { useState } from "react";
import { CameraIcon } from "@repo/ui/icons/CameraIcon";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

type BoxProps = {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  value?: string;
};

export const Box = React.forwardRef<HTMLInputElement, BoxProps>(
  (
    { label = "Add Images / Videos", error, onChange, value, ...props },
    ref
  ) => {
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setLoading(true);
      const { url, err } = await uploadToCloudinary(file, "Spoona/recipes");

      if (url) {
        onChange?.(url);
      } else {
        console.log(err);
      }
      setLoading(false);
    };

    return (
      <div className="flex flex-col items-center justify-center mt-10">
        {value && !loading && (
          <div className="mb-4">
            <img src={value} alt="Preview" className="w-100 object-contain" />
          </div>
        )}
        <div className="relative w-[600px] h-[200px] bg-gray-200 rounded outline-1 outline-gray-300 flex justify-center items-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            ref={ref}
            className="absolute inset-0 opacity-0 cursor-pointer"
            {...props}
            onChange={handleFileChange}
          />
          <label className="flex flex-col justify-center items-center pointer-events-none">
            <CameraIcon />
            <div className="text-sm text-gray-600">{label}</div>
          </label>
        </div>
        <span className="text-red-500 text-xs min-h-[16px] flex">
          {error ?? ""}
        </span>
      </div>
    );
  }
);

Box.displayName = "Box";
