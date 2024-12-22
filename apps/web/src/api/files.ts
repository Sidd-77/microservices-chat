import axios from "axios";
const FILE_SERVICE_URL = 'http://localhost:3002/api/files';

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${FILE_SERVICE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return response.json();
};

export const getFileUrl = async (fileName: string) => {
  const response = await axios.post(`${FILE_SERVICE_URL}/download`, { fileName });

  if (response.status !== 200) {
    throw new Error('Failed to get file URL');
  }

  return response.data.url;
};
