import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotebooksModule } from 'src/notebooks/notebooks.module';
import { UploadsModule } from 'src/uploads/uploads.module';
import { CellModule } from 'src/cell/cell.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [PrismaModule, AiModule, NotebooksModule, UploadsModule, CellModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
