import fs from "fs";
import { resolve } from "path";

import upload from "../../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    const oldPath = resolve(upload.tmpFolder, file);
    const newPath = resolve(`${upload.tmpFolder}/${folder}`, file);

    await fs.promises.rename(oldPath, newPath);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }
}
