import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
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
  @UseInterceptors(
    FileInterceptor('file', new UploadService().getMulterOptions()),
  )
  uploadFile(@UploadedFile() file: uploadFileDto.CustomFile) {
    return {
      message: 'File uploaded successfully!',
      filename: file.name,
      path: file.path,
    };
  }

  @Get('search')
  @ApiOperation({ summary: 'Search files in uploads folder' })
  @ApiQuery({
    name: 'q',
    required: true,
    description: 'Search term for filenames',
  })
  @ApiResponse({ status: 200, description: 'List of matching files' })
  searchFiles(@Query('q') query: string) {
    const results = this.uploadService.searchFiles(query);
    return { count: results.length, files: results };
  }
}
