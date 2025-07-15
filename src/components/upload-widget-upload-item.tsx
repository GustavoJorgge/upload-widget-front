import * as Progress from "@radix-ui/react-progress";
import { motion } from "motion/react";
import { Download, ImageUp, Link2, RefreshCcw, X } from "lucide-react";
import { Button } from "./ui/button";
import type { Upload } from "../store/uploads";
import { formatBytes } from "../utils/format-bytes";

interface UploadWidgetUploadItemProps {
  upload: Upload;
}

export function UploadWidgetUploadItem({
  upload,
}: UploadWidgetUploadItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="p-3 rounded-lg flex flex-col gap-3 shadow-shape-content bg-white/2 relative overflow-hidden [&+div]:mt-2"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium flex items-center gap-1">
          <ImageUp className="size-3 text-zinc-300" strokeWidth={1.5} />
          <span>{upload.name}</span>
        </span>

        <span className="text-xxs text-zinc-400 flex gap-1.5 items-center">
          <span className="line-through">{formatBytes(upload.file.size)}</span>
          <div className="size-1 rounded-full bg-zinc-700" />
          <span>
            300kb
            <span className="text-green-400 ml-1"></span>
          </span>
          <div className="size-1 rounded-full bg-zinc-700" />
          <span>45%</span>
        </span>
      </div>

      <Progress.Root className="bg-zinc-800 rounded-full h-1 overflow-hidden">
        <Progress.Indicator
          className="bg-indigo-500 h-1"
          style={{ width: "43%" }}
        />
      </Progress.Root>

      <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
        <Button size="icon-sm">
          <Download className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Download comprime imagem</span>
        </Button>
        <Button size="icon-sm">
          <Link2 className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Copiar URL da imagem</span>
        </Button>
        <Button size="icon-sm">
          <RefreshCcw className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Tentar upload novamente</span>
        </Button>
        <Button size="icon-sm">
          <X className="size-4" strokeWidth={1.5} />
          <span className="sr-only">Cancelar upload</span>
        </Button>
      </div>
    </motion.div>
  );
}
