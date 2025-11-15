import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotebooksModule } from 'src/notebooks/notebooks.module';
import { UploadsModule } from 'src/uploads/uploads.module';
import { AnalyzeModule } from 'src/analyze/analyze.module';
import { CellModule } from 'src/cell/cell.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    NotebooksModule,
    UploadsModule,
    CellModule,
    AnalyzeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
