import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { awsConfig } from './aws.config';

export interface UploadFile {
  originalname: string;
  buffer: Buffer;
  mimetype: string;
  size: number;
}

@Injectable()
export class AwsService {
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    if (!awsConfig.bucketName) {
      throw new InternalServerErrorException('S3 bucket name is not defined in awsConfig');
    }
    this.bucketName = awsConfig.bucketName;

    this.s3 = new AWS.S3({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
    });
  }

  async uploadFile(file: UploadFile, folder = 'uploads'): Promise<string> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: `${folder}/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    const data = await this.s3.upload(params).promise();
    return data.Location;
  }
}
