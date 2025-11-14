import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class UploadService {
  private readonly baseUploadFolder = join(process.cwd(), 'uploads');
  private readonly allowedExtensions = ['jpg', 'png', 'pdf', 'txt']; // allowed file types

  /**
   * Multer options with per-user folder
   * @param userId string - unique user identifier
   * @param subFolder optional subfolder inside user folder
   */
  getMulterOptions(userId: string, subFolder: string = '') {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const userFolder = join(this.baseUploadFolder, userId, subFolder);
          if (!existsSync(userFolder)) mkdirSync(userFolder, { recursive: true });
          cb(null, userFolder);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${ext}`);
        },
      }),
    };
  }

  /** Validate file exists and is not empty */
  private isFileValid(filePath: string): boolean {
    try {
      const stats = statSync(filePath);
      return stats.isFile() && stats.size > 0;
    } catch {
      return false;
    }
  }

  /** Check allowed file extension */
  private isAllowedExtension(filePath: string): boolean {
    const ext = filePath.split('.').pop()?.toLowerCase();
    return ext ? this.allowedExtensions.includes(ext) : false;
  }

  /** Optional: can read the file */
  private canReadFile(filePath: string): boolean {
    try {
      readFileSync(filePath, { flag: 'r' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Search files in a specific user's folder
   * @param userId string
   * @param searchTerm string
   */
  searchFiles(userId: string, searchTerm: string = '', subFolder: string = ''): string[] {
    const userFolder = join(this.baseUploadFolder, userId, subFolder);
    if (!existsSync(userFolder)) return [];

    const files = readdirSync(userFolder);

    return files
      .filter((file) => file.includes(searchTerm))
      .map((file) => join(userFolder, file))
      .filter(
        (filePath) =>
          this.isFileValid(filePath) &&
          this.isAllowedExtension(filePath) &&
          this.canReadFile(filePath),
      );
  }
}
