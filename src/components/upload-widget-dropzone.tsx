import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import CircularProgressBar from "./ui/circular-progress-bar";
import { usePendingUploads, useUploads } from "../store/uploads";

export function UploadWidgetDropzone() {
  // interessante utilizar o store para trazer exatamente o dado que precisamos, para nao calcularmos e renderizarmos atoa
  const amountOfUploads = useUploads((store) => store.uploads.size);
  const addUploads = useUploads((Store) => Store.addUploads);
  const { isThereAnyPendingUploads, globalPercentage } = usePendingUploads();

  // Configura o hook useDropzone com as opções de upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // Define os tipos de arquivo aceitos
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"], // Aceita apenas arquivos PNG
      "text/html": [".html", ".htm"], // Aceita arquivos HTML
    },
    // Callback executado quando arquivos são soltos na área de drop
    onDrop(acceptedFiles, _fileRejections, _event) {
      addUploads(acceptedFiles);
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
        {isThereAnyPendingUploads ? (
          <div className="flex flex-col gap-2.5 items-center">
            <CircularProgressBar
              progress={globalPercentage}
              size={56}
              strokeWidth={4}
            />
            <span>Uploading {amountOfUploads} files...</span>
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
