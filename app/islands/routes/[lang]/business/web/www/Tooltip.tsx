import clsx from 'npm:clsx@^2.1.1';

interface TooltipProps {
    children: React.ReactNode;
    label: string;
    className?: string;
};

export function Tooltip({ children, label, className }: TooltipProps) {
  return (
    <div className={clsx(className, "relative group cursor-pointer z-50")}>
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-max max-w-xs px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {label}
      </div>
    </div>
  );
}
