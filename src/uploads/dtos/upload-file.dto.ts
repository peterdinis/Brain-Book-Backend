import { ApiProperty } from '@nestjs/swagger';

export interface CustomFile extends File {
  path: string;
}

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  file: CustomFile;
}
