import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  endpoint: process.env.S3_ENDPOINT, // For custom S3-compatible storage
  forcePathStyle: true, // Needed for some S3-compatible services
});

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const bucket = process.env.S3_BUCKET || 'your-bucket-name';
    
    const uploadCommand = new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    });

    await s3Client.send(uploadCommand);
    
    // Construct the URL based on your S3 bucket/endpoint configuration
    const fileUrl = `${process.env.S3_PUBLIC_URL}/${fileName}`;
    return fileUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
};