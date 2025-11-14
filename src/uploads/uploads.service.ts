// upload.service.ts
import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class UploadService {
  private readonly uploadFolder = join(process.cwd(), 'uploads');

  getMulterOptions(destinationFolder: string = 'uploads') {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), destinationFolder);
          if (!existsSync(uploadPath))
            mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          cb(null, `${uniqueSuffix}.${ext}`);
        },
      }),
    };
  }

  /**
   * Search files in the uploads folder by name (partial or full match)
   * @param searchTerm string to search in filenames
   * @returns array of full file paths
   */
  searchFiles(searchTerm: string): string[] {
    if (!existsSync(this.uploadFolder)) return [];

    const files = readdirSync(this.uploadFolder);
    const matchedFiles = files.filter((file) => file.includes(searchTerm));
    return matchedFiles.map((file) => join(this.uploadFolder, file));
  }
}
