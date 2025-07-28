import type { Signal } from "@preact/signals";
import { Button } from "@components/Button.tsx";
import { useBarcode } from "next-barcode";
import { useState, useEffect } from "preact/hooks";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Ocr, TextDetections } from "@capacitor-community/image-to-text";
import { CameraPreview, CameraPreviewOptions } from "@capacitor-community/camera-preview";
import { CirclePause, CreditCard, ShieldCheckIcon, Trash } from 'npm:lucide-preact';
import ClientAppPaymentNextButton from "@islands/routes/[lang]/client/app/payment/NextButton.tsx";

// Regex ajustadas para buscar dentro de texto más grande
const cvcRegex = /(?:CVC|cvc|Cvc)[: -]?\s*(\d{3,4})\b/;
const cardNumberRegex = /\b(\d{4})[\s;:l]*(\d{4})[\s;:l]*(\d{4})[\s;:l]*(\d{4})\b/;
const expiryDateRegex = /\b(0[1-9]|1[0-2])[/-](20\d{2}|\d{2})\b/;

interface CounterProps {
  count: Signal<number>;
}

interface Props {
  actualLang?: string;
}

export default function BankCardScanner({ actualLang }: Props) {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [text, setText] = useState<string>("");
  const [cvc, setCvcText] = useState<string>("");
  const [cardNumber, setCardNumberText] = useState<string>("");
  const [expiryDate, setExpiryDateText] = useState<string>("");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

  console.log('Card Number: ');
  console.log(cardNumber);

  const cameraPreviewOptions: CameraPreviewOptions = {
    position: "rear",
    width: 1000, // Minimizar para ocultar y asegurar captura
    height: 1000,
    x: 0,
    y: 0,
    toBack: true,
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/\D/g, '') // Eliminar caracteres no numéricos
      .replace(/(\d{4})/g, '$1-')   // Insertar guiones cada 4 dígitos
      .replace(/-$/, '')
      .replaceAll("-", "");           // Eliminar guion final si sobra
  };

  const startCameraPreview = async () => {
    try {
      await CameraPreview.start(cameraPreviewOptions);
      setIsCameraActive(true);
      console.log("Cámara trasera iniciada");

      const intervalId = setInterval(async () => {
        try {
          const result = await CameraPreview.captureSample({ quality: 90 });
          const base64PictureData = result.value;
          setImage(`data:image/jpeg;base64,${base64PictureData}`);

          const data: TextDetections = await Ocr.detectText({ base64: base64PictureData });
          const detectedText = data.textDetections.map((detection) => detection.text).join(" ");

          // Actualizar el texto detectado
          setText(detectedText); // Reemplazar en lugar de acumular

          // Validar directamente el texto detectado
          const cvcMatch = detectedText.match(cvcRegex);
          const cardNumberMatch = detectedText.match(cardNumberRegex);
          const expiryDateMatch = detectedText.match(expiryDateRegex);

          if (cvcMatch) {
            setCvcText(cvcMatch[0].replace(/\D/g, ''));
            console.log(`CVC detectado: ${cvcMatch[0]}`);
          }
          if (cardNumberMatch) {
            setCardNumberText(formatCardNumber(cardNumberMatch[0].replace(/\D/g, '')));
            console.log(`Número de tarjeta detectado: ${cardNumberMatch[0]}`);
          }
          if (expiryDateMatch) {
            setExpiryDateText(expiryDateMatch[0]);
            console.log(`Fecha de caducidad detectada: ${expiryDateMatch[0]}`);
          }

          // Depuración
          console.log("Texto detectado:", detectedText);
        } catch (error) {
          console.error("Error al capturar el frame:", error);
        }
      }, 1500);

      return () => {
        clearInterval(intervalId);
        stopCameraPreview(); // Asegurarse de detener la cámara al limpiar
      };
    } catch (error) {
      console.error("Error al iniciar la cámara:", error);
    }
  };

  const stopCameraPreview = async () => {
    try {
      await CameraPreview.stop();
      setIsCameraActive(false);
      setImage("");
      setText("");
      console.log("Cámara detenida");
    } catch (error) {
      console.error("Error al detener la cámara:", error);
    }
  };

  const removePicture = () => {
    setText("");
    setCvcText("");
    setCardNumberText("");
    setExpiryDateText("");
  };

  useEffect(() => {
    return () => {
      if (isCameraActive) stopCameraPreview();
    };
  }, [isCameraActive]);

  return (
    <form method="POST" class="flex flex-col gap-y-8 bg-white">
      <div className="flex flex-col border-2 m-2 p-3 rounded-lg gap-y-4">
        {image && <img src={image} width="100%" className="rounded-lg h-40 object-cover" alt="Frame capturado" />}
        <div className={"flex flex-row justify-around w-full"}>
          <div className="flex flex-col justify-center text-center">
            <button type={"button"} className="flex flex-col p-5 border-2 rounded-full" onClick={startCameraPreview} disabled={isCameraActive}>
              <CreditCard color="black" size={30}/>
            </button>
            <span className={"font-dancing font-semibold text-2xl"}>Escanear</span>
          </div>
          <div className="flex flex-col justify-center text-center">
            <button type={"button"} className="p-5 border-2 rounded-full" onClick={stopCameraPreview} disabled={!isCameraActive}>
              <CirclePause color="black" size={30}/>
            </button>
            <span className={"font-dancing font-semibold text-2xl"}>Pausar</span>
          </div>
          <div className="flex flex-col justify-center text-center">
            <button type={"button"} className="p-5 border-2 rounded-full" onClick={removePicture}>
              <Trash color="black" size={30}/>
            </button>
            <span className={"font-dancing font-semibold text-2xl"}>Borrar</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            {cvc ? (
              <div className="flex flex-col gap-y-4 rounded-lg border-2 gap-x-2 p-4">
                <span className="font-medium">CVC</span>
                <input
                  type="text"
                  name="cvc"
                  className="w-full border-2 rounded-lg p-4 font-bold text-3xl"
                  value={cvc}
                  placeholder="CVC (Ej.: 123)"
                  maxLength={4}
                  onChange={(e) => {
                    const input = e.target as HTMLInputElement;
                    setCvcText(input.value.replace(/\D/g, '').slice(0, 4));
                  }}
                />
              </div>
            ) : (
              <input
                type="text"
                name="cvc"
                className="w-full border-2 rounded-lg p-4"
                placeholder="CVC (Ej.: 123)"
              />
            )}
          </div>
          <div>
            {expiryDate ? (
              <div className="flex flex-col gap-y-4 rounded-lg border-2 gap-x-2 p-4">
                <span className="font-medium">Fecha de caducidad</span>
                <input
                  type="text"
                  name="expiry_date"
                  className="w-full border-2 rounded-lg p-4 font-bold text-3xl"
                  value={expiryDate}
                  placeholder="Fecha de caducidad (Ej.: 05/10)"
                  maxLength={5}
                  onChange={(e) => {
                    const input = e.target as HTMLInputElement;
                    setExpiryDateText(input.value);
                  }}
                />
              </div>
            ) : (
              <input
                type="text"
                name="expiry_date"
                className="w-full border-2 rounded-lg p-4"
                placeholder="Fecha de caducidad (Ej.: 05/10)"
              />
            )}
          </div>
          <div>
            {cardNumber ? (
              <div className="flex flex-col gap-y-4 rounded-lg border-2 gap-x-2 p-4">
                <span className="font-medium">Número de tarjeta</span>
                <input
                  type="text"
                  name="card_number"
                  className="w-full border-2 rounded-lg p-4 font-bold text-3xl"
                  value={cardNumber}
                  placeholder="Número de tarjeta (Ej.: 1234567890123456)"
                  maxLength={19}
                  onChange={(e) => {
                    const input = e.target as HTMLInputElement;
                    setCardNumberText(formatCardNumber(input.value));
                  }}
                />
              </div>
            ) : (
              <input
                type="text"
                name="card_number"
                className="w-full border-2 rounded-lg p-4"
                placeholder="Número de tarjeta (Ej.: 1234567890123456)"
              />
            )}
          </div>
        </div>
        <div className={"flex gap-x-1"}>
          <ShieldCheckIcon/>
          <span>Cumplimiento RGPD & LSSI-CE & PCI SSC (SAQ D)</span>
        </div>
        <ClientAppPaymentNextButton actualLang={actualLang}/>
      </div>
    </form>
  );
}