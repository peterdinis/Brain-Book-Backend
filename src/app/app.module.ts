import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotebooksModule } from 'src/notebooks/notebooks.module';
import { UploadsModule } from 'src/uploads/uploads.module';
import { AnalyzeModule } from 'src/analyze/analyze.module';

@Module({
  imports: [PrismaModule, NotebooksModule, AnalyzeModule, UploadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
