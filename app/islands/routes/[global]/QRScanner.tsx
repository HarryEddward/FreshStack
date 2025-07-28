// islands/QrScannerButton.tsx
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from 'npm:@capacitor/barcode-scanner';
import { QrCodeIcon } from "npm:lucide-preact@^0.485.0";
import { Signal } from '@preact/signals';
import { useEffect, useRef } from 'preact/hooks';

interface QrScannerProps {
  text: Signal<string>;
  onScan?: () => void;
}

export default function Global_QrScanner({
  text,
  onScan
}: QrScannerProps) {
  


  const scanBarcode = async () => {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.QR_CODE
    });
    console.log(result.ScanResult);
    console.log(typeof text);
    text.value = result.ScanResult;
    if (onScan) onScan();
    
  };
  


  return (
    <>
      <button
        type="button"
        onClick={scanBarcode}
        className="w-auto py-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 border-2"
      >
        <QrCodeIcon/>
      </button>
    </>
  );
}