import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadService } from './uploads.service';
import * as uploadFileDto from './dtos/upload-file.dto';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a file to the server' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: uploadFileDto.UploadFileDto })
  @UseInterceptors(FileInterceptor('file', new UploadService().getMulterOptions()))
  uploadFile(@UploadedFile() file: uploadFileDto.CustomFile) {
    return {
      message: 'File uploaded successfully!',
      filename: file.name,
      path: file.path,
    };
  }
}
