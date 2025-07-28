import { h } from "preact";
import { useState } from "preact/hooks";
import { Tooltip } from "../[lang]/business/web/www/Tooltip.tsx";

interface ToggleSwitchProps {
  checked?: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  className?: string;
}

export default function Global_ToggleSwitch({
  checked = false,
  onChange,
  label = "",
  className = "",
}: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {label && <span className="text-gray-700">{label}</span>}
      
        <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
            isChecked ? "bg-emerald-500" : "bg-gray-300"
            }`}
        >
            <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out shadow ${
                isChecked ? "translate-x-6" : "translate-x-1"
            }`}
            />
        </button>
    </div>
  );
}
