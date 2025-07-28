import { useBarcode } from 'next-barcode';
import clsx from 'clsx';

interface Props {
  className?: string;
  valueBarcode: string;
}

export default function ClientAppTransactionOrderBarcode({  className, valueBarcode }: Props) {
  
  const { inputRef } = useBarcode({
    value: valueBarcode,
    
    options: {
      background: '#fff',
      displayValue: false
    }
  });

  console.log(inputRef);
  
  return <svg className={clsx("w-full", className)} ref={inputRef} />;

}
