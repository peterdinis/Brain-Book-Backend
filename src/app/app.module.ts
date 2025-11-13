import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotebooksModule } from 'src/notebooks/notebooks.module';

@Module({
  imports: [PrismaModule, NotebooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
