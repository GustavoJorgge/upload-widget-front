import { useDropzone } from "react-dropzone";

export function UploadWidgetDropzone() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/png": [".png"],
      "text/html": [".html", ".htm"],
    },
  });
  return (
    <div className="px-3 h-32">
      <div
        className="cursor-pointer text-zinc-400 bg-black/20 p-5 rounded-lg border border-zinc-700 border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-400 transition-colors"
        {...getRootProps()}
      >
        <input type="file" {...getInputProps()} />

        <span className="text-xs">Anexe seus arquivos ou</span>
        <span className="text-xs underline">Clique aqui para importar</span>
      </div>
    </div>
  );
}
