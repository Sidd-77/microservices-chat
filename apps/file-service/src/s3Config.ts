import AWS from 'aws-sdk';

export const s3Client = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID || "messagepunk",
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "messagepunk",
  endpoint: process.env.S3_ENDPOINT || "http://localhost:9000",
  s3ForcePathStyle: true // needed for non-AWS S3 compatible services
});
