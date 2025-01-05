# File-service Documentation

### Upload File
**Path:** `/api/files/upload`

**Method:** `POST`

**Parameters:**
- `file` (file): The file to be uploaded.

**Returns:**
- `result` (object): The result of the file upload.

**Errors:**
- `400`: No file provided.
- `500`: Failed to upload file.

---

### Download File
**Path:** `/api/files/download`

**Method:** `POST`

**Parameters:**
- `fileName` (string): The name of the file to download.

**Returns:**
- `url` (string): The URL to download the file.

**Errors:**
- `400`: No file name provided.
- `500`: Failed to generate download URL.


