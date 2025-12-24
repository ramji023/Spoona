import { forwardRef, useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
interface AutocompleteInputProps {
  text: string;
  placeholder?: string;
  boxSize?: string;
  options: string[];
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
}

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(
  (
    {
      text,
      placeholder = "",
      boxSize,
      options,
      error,
      value = "",
      onChange,
      onBlur,
      name,
    },
    ref
  ) => {
    // store what user is typing in input field
    const [inputValue, setInputValue] = useState("");
    //here controle wheather dropdown list should show or not (by default not)
    const [showSuggestions, setShowSuggestions] = useState(false);
    // show array of selected tegs
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    // reference to the wrapper div so can detect click outside of the box
    const wrapperRef = useRef<HTMLDivElement>(null);

    // effect run to parse form-data-value into tags on mount or when value changes
    useEffect(() => {
      if (value) {
        const tags = value
          .split(",") // split this "x","y","z" into ["x","y","z"]
          .map((tag) => tag.trim()) // trim the string
          .filter((tag) => tag.length > 0); // remove zero length of string
        setSelectedTags(tags); // saved all tags into selectedTages array
      } else {
        setSelectedTags([]); // if value is null then set empty array
      }
    }, [value]); // it runs when component mount or value change

    //show filter options based on user input and exclude already selected tags
    const filteredOptions = options.filter(
      (option) =>
        option.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedTags.includes(option)
    );

    // effect to handle clicking outside to close suggestions
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Add tag to selected tags
    const addTag = (tag: string) => {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      updateFormValue(newTags);
      setInputValue("");
      setShowSuggestions(false);
    };

    // Remove tag from selected tags
    const removeTag = (tagToRemove: string) => {
      const newTags = selectedTags.filter((tag) => tag !== tagToRemove);
      setSelectedTags(newTags);
      updateFormValue(newTags);
    };

    // Update form value (convert array to comma-separated string)
    const updateFormValue = (tags: string[]) => {
      const newValue = tags.join(", ");
      onChange?.(newValue);
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setShowSuggestions(true);
    };

    // Handle key press (Enter to select first suggestion, Backspace to remove last tag)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        // Only add if there's a matching option from the list
        if (filteredOptions.length > 0) {
          addTag(filteredOptions[0]);
        }
        // Removed: else if (inputValue.trim()) { addTag(inputValue.trim()); }
      } else if (
        e.key === "Backspace" &&
        !inputValue &&
        selectedTags.length > 0
      ) {
        // Remove last tag when backspace is pressed and input is empty
        removeTag(selectedTags[selectedTags.length - 1]);
      }
    };

    return (
      <div className="flex justify-center mt-10 relative">
        <div className={` ${boxSize}`} ref={wrapperRef}>
          <label className="text-lg font-semibold mb-2">{text}</label>

          <div
            className={`outline-1 outline-gray-300 rounded px-5 py-3 flex flex-wrap gap-2 items-center ${
              error ? "border-red-500" : "border-gray-300"
            } bg-gray-200 focus:outline-orange-400`}
          >
            {/* Display selected tags */}
            {selectedTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-orange-400 text-white px-2 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:bg-orange-500 rounded-full p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}

            {/* Input field */}
            <input
              ref={ref}
              type="text"
              name={name}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              onBlur={onBlur}
              placeholder={selectedTags.length === 0 ? placeholder : ""}
              className="flex-1 outline-none bg-transparent"
            />
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && filteredOptions.length > 0 && (
            <div className="absolute z-10 mt-1 bg-gray-200 border border-gray-300 rounded-lg shadow-lg max-h-60 w-[600px] overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-orange-400 cursor-pointer text-sm"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input blur
                    addTag(option);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}

          {/* Error message */}
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

          {/* Hidden input to store the actual value for react-hook-form */}
          <input type="hidden" value={value} />
        </div>
      </div>
    );
  }
);

AutocompleteInput.displayName = "AutocompleteInput";
