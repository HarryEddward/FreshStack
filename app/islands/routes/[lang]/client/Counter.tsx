import type { Signal } from "@preact/signals";
import { Button } from "@components/Button.tsx";
import { useBarcode } from "next-barcode";
import { useState, useEffect } from "preact/hooks";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Ocr, TextDetections } from "@capacitor-community/image-to-text";
import { CameraPreview, CameraPreviewOptions } from "@capacitor-community/camera-preview";

// Regex ajustadas para buscar dentro de texto más grande
const cvcRegex = /(?:CVC|cvc|Cvc)[: -]?\s*(\d{3,4})\b/;

const cardNumberRegex = /\b(\d{4})[\s;:l]*(\d{4})[\s;:l]*(\d{4})[\s;:l]*(\d{4})\b/;
const expiryDateRegex = /\b(0[1-9]|1[0-2])[/-](20\d{2}|\d{2})\b/;

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [text, setText] = useState<string>("");
  const [cvc, setCvcText] = useState<string>("");
  const [cardNumber, setCardNumberText] = useState<string>("");
  const [expiryDate, setExpiryDateText] = useState<string>("");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

  const cameraPreviewOptions: CameraPreviewOptions = {
    position: "rear",
    width: 1000, // Minimizar para ocultar y asegurar captura
    height: 1000,
    x: -1000,
    y: -1000,
    toBack: true,
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
            setCvcText(cvcMatch[0]);
            console.log(`CVC detectado: ${cvcMatch[0]}`);
          }
          if (cardNumberMatch) {
            setCardNumberText((cardNumberMatch[0]).replace(/\D/g, ' '));
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

      return () => clearInterval(intervalId);
    } catch (error) {
      console.error("Error al iniciar la cámara:", error);
    }
  };

  const stopCameraPreview = async () => {
    try {
      await CameraPreview.stop();
      setIsCameraActive(false);
      setImage(undefined);
      setText("");
      setCvcText("");
      setCardNumberText("");
      setExpiryDateText("");
      console.log("Cámara detenida");
    } catch (error) {
      console.error("Error al detener la cámara:", error);
    }
  };

  const takePicture = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      setImage(`data:image/jpeg;base64,${photo.base64String}`);

      if (photo.base64String) {
        const data: TextDetections = await Ocr.detectText({ base64: photo.base64String });
        const detectedText = data.textDetections.map((detection) => detection.text).join(" ");
        setText(detectedText);

        const cvcMatch = detectedText.match(cvcRegex);
        const cardNumberMatch = detectedText.match(cardNumberRegex);
        const expiryDateMatch = detectedText.match(expiryDateRegex);

        if (cvcMatch) setCvcText(cvcMatch[0]);
        if (cardNumberMatch) setCardNumberText(cardNumberMatch[0]);
        if (expiryDateMatch) setExpiryDateText(expiryDateMatch[0]);
      } else {
        console.error("No base64 string available from the photo");
      }
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  };

  const removePicture = () => {
    setImage(undefined);
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

  const { inputRef } = useBarcode({
    value: "CODE101HE27HPP",
    options: { background: "#ffffff", format: "CODE128" },
  });

  return (
    <div class="flex flex-col gap-y-8 py-6 bg-white">
      <Button onClick={takePicture}>Tomar Foto</Button>
      <Button onClick={startCameraPreview} disabled={isCameraActive}>
        Iniciar Captura Automática
      </Button>
      <Button onClick={stopCameraPreview} disabled={!isCameraActive}>
        Detener Captura Automática
      </Button>
      <Button onClick={removePicture}>Eliminar Imagen</Button>
      <svg className="w-full" ref={inputRef} />
      <div className="flex flex-col gap-y-2">
        <div className="bg-gray-100 p-2 rounded-md">Texto detectado: {text}</div>
      </div>
      {image && <img src={image} width="100%" alt="Frame capturado" />}
      <div className="flex flex-col gap-y-4">
        <div>CVC: {cvc ? 
            <div className="font-bold text-3xl">{cvc}</div>
            : 
            <span className="">No reconocida</span>
          }</div>
        <div>Fecha de caducidad: {
          expiryDate ?
            <div className="font-bold text-3xl">{expiryDate}</div>
            : 
            <span className="">No reconocida</span>
          }</div>
        <div>Número de tarjeta: {cardNumber ? 
            <div className="font-bold text-3xl">{cardNumber}</div>
            : 
            <span className="">No reconocida</span>
          }</div>
      </div>
    </div>
  );
}
