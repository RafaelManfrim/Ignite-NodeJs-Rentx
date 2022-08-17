import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "../../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalname = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalname);

    const contentType = mime.getType(originalname);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalname);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
      })
      .promise();
  }
}
