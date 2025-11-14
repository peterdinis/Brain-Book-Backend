import { Module } from '@nestjs/common';
import { UploadController } from './uploads.controller';
import { UploadService } from './uploads.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadsModule {}
