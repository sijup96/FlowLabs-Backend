import { ObjectCannedACL, PutObjectCommand } from "@aws-sdk/client-s3";
import { I_S3Bucket } from "../../interface/service/I_s3BucketService";
import { envConfig } from "../../shared/config/env.config";
import { s3 } from "../../shared/config/aws.s3.bucket.config";

export class AwsS3Bucket implements I_S3Bucket {
  constructor() {}
  async uploadCompanyLogo(
    imageName: string,
    buffer: Buffer,
    contentType: string
  ): Promise<void> {
    const params = {
      Bucket: envConfig.S3_BUCKET_NAME,
      Key: `company_logo/${imageName}`,
      Body: buffer,
      ContentType: contentType,
    //   ACL:ObjectCannedACL.public_read,
    };
    try {
      const command = new PutObjectCommand(params);
       await s3.send(command);
    } catch (error) {
      throw error;
    }
  }
}
