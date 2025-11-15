import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotebooksModule } from 'src/notebooks/notebooks.module';
import { CellModule } from 'src/cell/cell.module';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AwsModule,
    NotebooksModule,
    CellModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
