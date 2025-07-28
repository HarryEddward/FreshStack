import { useSignal } from '@preact/signals';
import { useEffect, useRef } from 'preact/hooks';
import Global_QrScanner from "@islands/routes/[global]/QRScanner.tsx";
import { Props } from "@routes/[lang]/license.tsx";

export default function LangClientAppPublicServicesLicenseIslandViewLicenseForm({ data }: { data: Props }) {
  const licenseText = useSignal<string>("");
  const licensePhoneText = useSignal<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  /*
  useEffect(() => {
    if (licenseText.value && formRef.current) {
      formRef.current.submit();
    }
  }, [licenseText.value]);*/

  return (
    <form
      method="POST"
      ref={formRef}
      className="w-full max-w-xl mx-auto px-4 py-6 bg-white rounded-xl shadow-md flex flex-col gap-y-4 transition-all duration-300"
    >
      <div className="w-full flex justify-end">
        <Global_QrScanner text={licenseText} onScan={() => formRef.current?.submit()} />
      </div>

      <input
        type="text"
        name="code_license"
        value={licenseText.value}
        onInput={(e) => licenseText.value = (e.target as HTMLInputElement).value}
        placeholder="Business License"
        className="w-full border-2 border-black rounded-md h-14 px-4 text-center text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
      />

      <input
        type="text"
        name="phone_license"
        value={licensePhoneText.value}
        onInput={(e) => licensePhoneText.value = (e.target as HTMLInputElement).value}
        placeholder="Phone License"
        className="w-full border-2 border-black rounded-md h-14 px-4 text-center text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
      />

      <button
        type="submit"
        className="w-full h-14 bg-green-200 border-black border-2 rounded-md text-black font-semibold hover:bg-green-300 hover:shadow-md active:scale-[0.98] transition-all"
      >
        Validar Licencia
      </button>

      {data.errorLicense && (
        <span className="text-red-500 font-medium text-center">
          Verifica tu licencia.
        </span>
      )}

      <p className="text-sm text-center text-gray-600 mt-2">
        ¿Dudas o consultas? Contáctanos por los medios oficiales.
      </p>
    </form>
  );
}
