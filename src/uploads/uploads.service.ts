import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class UploadService {
  private readonly uploadFolder = join(process.cwd(), 'uploads');
  private readonly allowedExtensions = ['jpg', 'png', 'pdf', 'txt']; // allowed file types

  getMulterOptions(destinationFolder: string = 'uploads') {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), destinationFolder);
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${ext}`);
        },
      }),
    };
  }

  /** Basic file validation: exists and not empty */
  private isFileValid(filePath: string): boolean {
    try {
      const stats = statSync(filePath);
      return stats.isFile() && stats.size > 0;
    } catch {
      return false;
    }
  }

  /** Check file extension */
  private isAllowedExtension(filePath: string): boolean {
    const ext = filePath.split('.').pop()?.toLowerCase();
    return ext ? this.allowedExtensions.includes(ext) : false;
  }

  /** Optional: check if file can be read */
  private canReadFile(filePath: string): boolean {
    try {
      readFileSync(filePath, { flag: 'r' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Search files in the uploads folder by name (partial or full match)
   * Only returns files that pass validation checks
   */
  searchFiles(searchTerm: string): string[] {
    if (!existsSync(this.uploadFolder)) return [];

    const files = readdirSync(this.uploadFolder);

    const matchedFiles = files
      .filter(file => file.includes(searchTerm))
      .map(file => join(this.uploadFolder, file))
      .filter(filePath => 
        this.isFileValid(filePath) &&
        this.isAllowedExtension(filePath) &&
        this.canReadFile(filePath)
      );

    return matchedFiles;
  }
}
