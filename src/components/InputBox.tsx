import { CameraIcon } from "../icons/CameraIcon";

export function InputBox({
  text,
  placeholder,
  size,
}: {
  text: string;
  placeholder: string;
  size: string;
}) {
  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col ">
          <label className="text-lg font-semibold mb-2">{text}</label>
          <input
            type="text"
            placeholder={placeholder}
            className={`${size} px-5 py-3 outline-1 outline-gray-300 rounded bg-gray-200 focus:outline-orange-400`}
          />
        </div>
      </div>
    </>
  );
}

export function TextAreaBox({
  size,
  placeholder,
  text,
}: {
  size: string;
  placeholder: string;
  text: string;
}) {
  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">{text}</label>
          <textarea
            rows={3}
            placeholder={placeholder}
            className={`${size} px-5 py-3 outline-1 outline-gray-300 rounded bg-gray-200 focus:outline-orange-400`}
          />
        </div>
      </div>
    </>
  );
}

export function InputBoxVariant({
  text,
  placeholder,
  size,
}: {
  text: string;
  placeholder: string;
  size: string;
}) {
  return (
    <>
      <div className="flex justify-center mt-10">
        <div className={`${size} flex flex-col`}>
          <label className="text-lg font-semibold mb-4">{text}</label>

          <div className="flex justify-between gap-4">
            <div className="flex items-center w-1/2 bg-gray-200 rounded  outline-1 outline-gray-300 px-3 focus-within:outline-orange-400">
              <label className="text-lg text-gray-500 mr-2 whitespace-nowrap">
                Hours
              </label>
              <input
                type="text"
                placeholder={placeholder}
                className="w-full py-3 text-lg bg-gray-200 outline-none text-black"
              />
            </div>

            <div className="flex items-center w-1/2 bg-gray-200 rounded  outline-1 outline-gray-300 px-3 focus-within:outline-orange-400">
              <label className="text-lg text-gray-500 mr-2 whitespace-nowrap">
                Minutes
              </label>
              <input
                type="text"
                placeholder={placeholder}
                className="w-full py-3 text-lg bg-gray-200 outline-none text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const Box = () => {
  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="relative w-[600px] h-[200px] bg-gray-200 rounded  outline-1 outline-gray-300 flex justify-center items-center cursor-pointer">
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <label className="flex flex-col justify-center items-center pointer-events-none">
            <CameraIcon />
            <div className="text-sm text-gray-600">Add Images / Videos</div>
          </label>
        </div>
      </div>
    </>
  );
};
