import axios from "axios";

interface UploadFileToStorage {
  file: File;
}

interface UploadFileToStorageOpts {
  signal?: AbortSignal;
}

export async function uploadFileToStorage(
  { file }: UploadFileToStorage,
  opts?: UploadFileToStorageOpts
) {
  const data = new FormData();

  data.append("file", file);
}
