import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';

@Module({
  imports: [PrismaModule],
  controllers: [NotebooksController],
  providers: [NotebooksService],
})
export class NotebooksModule {}
