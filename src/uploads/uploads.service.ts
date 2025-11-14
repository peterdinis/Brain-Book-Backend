import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join, extname } from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class UploadService {
  getMulterOptions(destinationFolder: string = 'uploads') {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), destinationFolder);

          // create folder if it doesn't exist
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExt}`);
        },
      }),
    };
  }
}
