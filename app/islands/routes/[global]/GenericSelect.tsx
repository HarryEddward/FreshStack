import { h } from "preact";
import { useState } from "preact/hooks";
import { ChevronDownIcon } from "npm:lucide-preact@^0.485.0";
import clsx from "npm:clsx@^2.1.1";

interface Option {
  label: string;
  value: string;
}

interface GenericSelectProps {
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export default function Global_GenericSelect({
  options,
  onChange,
  placeholder = "Selecciona una opción",
  className = "",
  defaultValue = "",
}: GenericSelectProps) {
  const [selected, setSelected] = useState(
    options.find((o) => o.value === defaultValue) ?? null
  );
  const [open, setOpen] = useState(false);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setOpen(false);
    onChange(option.value);
  };

  return (
    <div className={clsx(className, `relative max-w-sm`)}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2 text-left shadow-sm flex justify-between items-center hover:shadow-md transition"
      >
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDownIcon className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <ul className="absolute z-40 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
