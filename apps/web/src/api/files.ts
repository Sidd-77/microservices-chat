import axios from "axios";
import { FILE_URL } from "../config/env";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${FILE_URL}/api/files/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return response.json();
};

export const getFileUrl = async (fileName: string) => {
  const response = await axios.post(`${FILE_URL}/api/files/download`, { fileName });

  if (response.status !== 200) {
    throw new Error('Failed to get file URL');
  }

  return response.data.url;
};
