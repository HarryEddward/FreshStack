import { useState } from "preact/hooks";
import { Image as ImageIcon, X as XIcon, AlertTriangle } from "lucide-preact";

export default function Global_FilePreviewInput() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const MAX_FILE_SIZE_MB = 2; // Tamaño máximo permitido

  const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const sizeInMB = file.size / (1024 * 1024);

      if (!file.type.startsWith("image/")) {
        setError("Solo se permiten imágenes");
        setPreview(null);
        setFileSize(null);
        return;
      }

      if (sizeInMB > MAX_FILE_SIZE_MB) {
        setError(`El archivo supera los ${MAX_FILE_SIZE_MB} MB`);
        setPreview(URL.createObjectURL(file));
        setFileSize(sizeInMB);
        return;
      }

      setError(null);
      setPreview(URL.createObjectURL(file));
      setFileSize(sizeInMB);
    }
  };

  const removePreview = () => {
    setPreview(null);
    setFileSize(null);
    setError(null);
  };

  return (
    <label
      class="relative flex flex-col items-center justify-center w-40 h-40 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 cursor-pointer transition-all hover:border-orange-400 hover:bg-orange-50 overflow-hidden shadow-sm"
    >
      {preview ? (
        <>
          <img
            src={preview}
            alt="Preview"
            class="object-cover w-full h-full"
          />
          <button
            type="button"
            onClick={removePreview}
            class="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70 transition"
          >
            <XIcon size={14} />
          </button>
          {/* Info del archivo */}
          {fileSize !== null && (
            <span
              class={`absolute bottom-1 left-1 text-xs px-2 py-0.5 rounded-md ${
                error
                  ? "bg-red-600 text-white"
                  : "bg-black bg-opacity-50 text-white"
              }`}
            >
              {error ? (
                <div class="flex items-center gap-1">
                  <AlertTriangle size={12} /> {error}
                </div>
              ) : (
                `${fileSize.toFixed(2)} MB`
              )}
            </span>
          )}
        </>
      ) : (
        <>
          <div class="flex flex-col items-center gap-2 text-center px-4">
            <div class="p-3 bg-gray-200 rounded-full">
              <ImageIcon size={32} />
            </div>
            <span class="text-xs font-medium">Haz clic o arrastra una imagen</span>
            <span class="text-[10px] text-gray-400">Formatos: JPG, PNG, WEBP</span>
          </div>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        class="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}
