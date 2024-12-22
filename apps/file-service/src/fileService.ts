import AWS from 'aws-sdk';
import { s3Client } from './s3Config';

export class FileService {
  private bucket: string;

  constructor() {
    this.bucket = process.env.AWS_BUCKET || 'messagepunk';
  }

  async uploadFile(file: Express.Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const tmp = await s3Client.upload(params).promise();
    console.log('Uploaded file:', tmp);

    return {
      fileName,
      fileUrl: `${process.env.S3_PUBLIC_URL}/${fileName}`,
      contentType: file.mimetype
    };
  }

  async getFileUrl(fileName: string) {
    console.log('Getting file URL:', fileName);
    const params: AWS.S3.GetObjectRequest = {
      Bucket: this.bucket,
      Key: fileName,
    };

    // Generate a URL that expires in 1 hour
    return s3Client.getSignedUrl('getObject', {
      ...params,
      Expires: 3600
    });
  }
}
