import express from 'express';
import { Router } from 'express';
import multer from 'multer';
import { FileService } from './fileService';

const router:Router = express.Router();
const fileService = new FileService();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
       res.status(400).json({ error: 'No file provided' });
       return;
    }

    const result = await fileService.uploadFile(req.file);
    res.json(result);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

router.post('/download', async (req, res) => {
  try {
    console.log('Generating download URL:', req.body);
    const { fileName } = req.body;
    if (!fileName) {
      res.status(400).json({ error: 'No file name provided' });
      return;
    }
    const url = await fileService.getFileUrl(fileName);
    res.json({ url });
  } catch (error) {
    console.error('Error generating download URL:', error);
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
});

export default router;
