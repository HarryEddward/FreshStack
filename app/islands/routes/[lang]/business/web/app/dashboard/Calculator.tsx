// @islands/routes/[lang]/business/web/app/dashboard/Calculator.tsx
import { useSignal } from "@preact/signals";
import { X, ShoppingCart } from "npm:lucide-preact@^0.485.0";

interface CalculatorProps {
  onClose: () => void;
  onResult?: (result: number) => void;
}

export default function LangBusinessWebAppDashboardIslandCalculator({ onClose, onResult }: CalculatorProps) {
  const display = useSignal<string>("0");
  const previousValue = useSignal<number | null>(null);
  const operation = useSignal<string | null>(null);
  const shouldResetDisplay = useSignal<boolean>(false);

  const inputNumber = (num: string) => {
    if (display.value === "0" || shouldResetDisplay.value) {
      display.value = num;
      shouldResetDisplay.value = false;
    } else {
      display.value += num;
    }
  };

  const inputOperation = (op: string) => {
    if (previousValue.value === null) {
      previousValue.value = parseFloat(display.value);
    } else if (operation.value) {
      calculateResult();
    }
    operation.value = op;
    shouldResetDisplay.value = true;
  };

  const calculateResult = () => {
    if (previousValue.value === null || operation.value === null) return;

    const current = parseFloat(display.value);
    let result: number;

    switch (operation.value) {
      case "+":
        result = previousValue.value + current;
        break;
      case "-":
        result = previousValue.value - current;
        break;
      case "×":
        result = previousValue.value * current;
        break;
      case "÷":
        if (current === 0) {
          display.value = "Error";
          return;
        }
        result = previousValue.value / current;
        break;
      default:
        return;
    }

    display.value = parseFloat(result.toFixed(2)).toString();
    previousValue.value = null;
    operation.value = null;
    shouldResetDisplay.value = true;
  };

  const clear = () => {
    display.value = "0";
    previousValue.value = null;
    operation.value = null;
    shouldResetDisplay.value = false;
  };

  const inputDecimal = () => {
    if (shouldResetDisplay.value) {
      display.value = "0.";
      shouldResetDisplay.value = false;
      return;
    }
    if (!display.value.includes(".")) {
      display.value += ".";
    }
  };

  const handleEquals = () => {
    calculateResult();
    if (onResult) {
      const result = parseFloat(display.value);
      if (!isNaN(result)) {
        onResult(result);
      }
    }
  };

  return (
    <div class="bg-gray-100 rounded-2xl p-4 w-full max-w-[320px] border-2 border-gray-300 shadow-xl">
      {/* Encabezado con título y botón de cierre */}


      {/* Pantalla combinada: operación y resultado */}
      <div class="bg-white p-4 rounded-xl mb-4 text-right font-mono border-2 border-gray-200 shadow-inner">
        <div class="text-gray-500 text-sm min-h-[20px]">
          {previousValue.value !== null && operation.value && (
            <span>
              {previousValue.value} {operation.value} {display.value}
            </span>
          )}
        </div>
        <div class="text-gray-900 text-3xl font-bold mt-1 truncate">
          {display.value}
        </div>
      </div>

      {/* Cuadrícula de botones más grandes y táctiles */}
      <div class="grid grid-cols-4 gap-3">
        <button 
          onClick={clear} 
          class="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white p-4 rounded-xl text-lg font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          C
        </button>
        <button 
          onClick={() => inputOperation("÷")} 
          class="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          ÷
        </button>
        <button 
          onClick={() => inputOperation("×")} 
          class="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          ×
        </button>
        <button 
          onClick={() => inputOperation("-")} 
          class="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-800 p-4 rounded-xl text-2xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          -
        </button>

        <button 
          onClick={() => inputNumber("7")} 
          class="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          7
        </button>
        <button 
          onClick={() => inputNumber("8")} 
          class="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          8
        </button>
        <button 
          onClick={() => inputNumber("9")} 
          class="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          9
        </button>
        <button 
          onClick={() => inputOperation("+")} 
          class="row-span-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-4 rounded-xl text-2xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all flex items-center justify-center"
        >
          +
        </button>

        <button 
          onClick={() => inputNumber("4")} 
          class="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          4
        </button>
        <button 
          onClick={() => inputNumber("5")} 
          class="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          5
        </button>
        <button 
          onClick={() => inputNumber("6")} 
          class="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          6
        </button>

        <button 
          onClick={() => inputNumber("1")} 
          class="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          1
        </button>
        <button 
          onClick={() => inputNumber("2")} 
          class="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          2
        </button>
        <button 
          onClick={() => inputNumber("3")} 
          class="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          3
        </button>
        <button 
          onClick={handleEquals} 
          class="row-span-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white p-4 rounded-xl shadow-lg active:shadow-inner active:translate-y-0.5 transition-all flex items-center justify-center"
          title="Registrar venta"
        >
          <ShoppingCart size={28} />
        </button>

        <button 
          onClick={() => inputNumber("0")} 
          class="col-span-2 bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          0
        </button>
        <button 
          onClick={inputDecimal} 
          class="bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 p-4 rounded-xl text-2xl font-bold shadow-lg active:shadow-inner active:translate-y-0.5 transition-all"
        >
          .
        </button>
      </div>
    </div>
  );
}