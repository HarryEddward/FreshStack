import { useBarcode } from 'next-barcode';
import clsx from 'clsx';

// 1. Definimos la interfaz para las opciones del barcode
interface BarcodeOptions {
  format?: string;
  width?: number;
  height?: number;
  displayValue?: boolean;
  text?: string;
  fontOptions?: string;
  font?: string;
  textAlign?: string;
  textPosition?: string;
  textMargin?: number;
  fontSize?: number;
  background?: string;
  lineColor?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  flat?: boolean;
  valid?: (valid: boolean) => void;
}

// 2. Definimos las props base del barcode
interface BarcodeProps {
  value: string;
  options?: BarcodeOptions;
}

// 3. Extendemos las props con nuestras props personalizadas
interface Props extends BarcodeProps {
  className?: string;
}

// 4. Implementamos el componente con todas las props
export default function Barcode({
  value,
  options = { background: "#ffffff", format: "CODE128" }, // Valores por defecto
  className,
}: Props) {
  const { inputRef } = useBarcode({
    value,
    options: {
      // Propagamos todas las opciones con valores por defecto si no se especifican
      format: options?.format ?? "CODE128",
      width: options?.width,
      height: options?.height,
      displayValue: options?.displayValue,
      text: options?.text,
      fontOptions: options?.fontOptions,
      font: options?.font,
      textAlign: options?.textAlign,
      textPosition: options?.textPosition,
      textMargin: options?.textMargin,
      fontSize: options?.fontSize,
      background: options?.background ?? "#000",
      lineColor: options?.lineColor,
      margin: options?.margin,
      marginTop: options?.marginTop,
      marginBottom: options?.marginBottom,
      marginLeft: options?.marginLeft,
      marginRight: options?.marginRight,
      flat: options?.flat,
      valid: options?.valid,
    },
  });

  // Usamos clsx para combinar clases dinámicamente
  const barcodeClasses = clsx("w-full", className);

  return <svg className={barcodeClasses} ref={inputRef} />;
}