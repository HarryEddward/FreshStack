/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";

export default function QrCode({
  text,
  size = 200,
}: { text: string, size?: number | string }) {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    import("https://cdn.skypack.dev/qr-code-styling").then(({ default: QRCodeStyling }) => {
      const qr = new QRCodeStyling({
        width: size,
        height: size,
        data: text,
        image: "", // opcional
        dotsOptions: {
          color: "#000",
          type: "rounded",
        },
        backgroundOptions: {
          color: "#fff",
        },
      });

      // Limpia el contenedor si ya hay un QR
      qrRef.current!.innerHTML = "";
      qr.append(qrRef.current!);
    });
  }, [text]);

  return <div ref={qrRef}></div>;
}
