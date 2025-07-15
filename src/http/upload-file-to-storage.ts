import axios from "axios";

interface UploadFileToStorage {
  file: File;
}

export async function UploadFileToStorage({ file }: UploadFileToStorage) {
  const data = new FormData();

  data.append("file", file);

  const response = await axios.post("http://localhost:3333/uploads", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { url: response.data.url };
}
