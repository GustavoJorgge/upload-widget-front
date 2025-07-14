import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import CircularProgressBar from "./ui/circular-progress-bar";

export function UploadWidgetDropzone() {
  const isThereAnyPendingUpload = true;
  const uploadGlobalPercentage = 66;

  // Configura o hook useDropzone com as opções de upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // Define os tipos de arquivo aceitos
    accept: {
      "image/png": [".png"], // Aceita apenas arquivos PNG
      "text/html": [".html", ".htm"], // Aceita arquivos HTML
    },
    // Callback executado quando arquivos são soltos na área de drop
    onDrop(acceptedFiles, fileRejections, event) {
      console.log(acceptedFiles); // Log dos arquivos aceitos
    },
  });

  return (
    <motion.div
      className="px-3 flex flex-col gap-3"
      // initial="closed"
      // animate="open"
      // variants={{
      //   open: { opacity: 1 },
      //   closed: { opacity: 0 },
      // }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Área principal de drop/upload */}
      <div
        data-active={isDragActive} // Atributo para controlar estado visual quando arrastar
        className="cursor-pointer text-zinc-400 bg-black/20 p-5 rounded-lg border border-zinc-700 border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-400 transition-colors data-[active=true]:bg-indigo-500/10 data-[active=true]:border-indigo-500 data-[active=true]:text-indigo-400"
        {...getRootProps()} // Aplica as props necessárias para o funcionamento do dropzone
      >
        {/* Input oculto que será acionado ao clicar na área */}
        <input type="file" {...getInputProps()} />

        {/* Texto instrucional para o usuário */}
        {isThereAnyPendingUpload ? (
          <div className="flex flex-col gap-2.5 items-center">
            <CircularProgressBar
              progress={uploadGlobalPercentage}
              size={56}
              strokeWidth={4}
            />
            <span>Uploading 2 files...</span>
          </div>
        ) : (
          <>
            <span className="text-xs">Anexe seus arquivos ou</span>
            <span className="text-xs underline">Clique aqui para importar</span>
          </>
        )}
      </div>

      {/* Texto informativo sobre tipos de arquivo suportados */}
      {/* NOTA: O texto diz "PNG e JPG" mas o código só aceita PNG e HTML */}
      <span className="text-xs text-zinc-400">
        Somente arquivos PNG e JPG são suportados
      </span>
    </motion.div>
  );
}
