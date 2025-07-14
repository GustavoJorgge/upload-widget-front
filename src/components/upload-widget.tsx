import * as Collapsible from "@radix-ui/react-collapsible";
import { UploadWidgetDropzone } from "./upload-widget-dropzone";
import { UploadWidgetHeader } from "./upload-widget-header";
import { UploadWidgetUploadList } from "./upload-widget-upload-list";
import { motion, useCycle } from "motion/react";
import { UploadWidgetMinimizedButton } from "./upload-widget-minimized-button";

export function UploadWidget() {
  const [isWidgetOpen, toogleWidgetOpen] = useCycle(false, true);

  return (
    <Collapsible.Root onOpenChange={() => toogleWidgetOpen()}>
      <motion.div
        className="bg-zinc-900 w overflow-hidden w-[360px] rounded-xl shadow-shape"
        animate={isWidgetOpen ? "open" : "closed"}
        variants={{
          closed: {
            width: "max-content",
            height: 44,
            transition: {
              type: "spring",
            },
          },
          open: {
            width: 380,
            height: "auto",
            transition: {
              duration: 0.3,
            },
          },
        }}
      >
        {!isWidgetOpen && <UploadWidgetMinimizedButton />}
        <Collapsible.Content>
          <UploadWidgetHeader />
          <div className="flex flex-col gap-4 py-3">
            <UploadWidgetDropzone />
            <div className="h-px bg-zinc-800 border-t border-black/50 box-content"></div>
            <UploadWidgetUploadList />
          </div>
        </Collapsible.Content>
      </motion.div>
    </Collapsible.Root>
  );
}
