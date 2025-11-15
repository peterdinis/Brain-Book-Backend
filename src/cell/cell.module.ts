import { Module } from '@nestjs/common';
import { NotebooksModule } from 'src/notebooks/notebooks.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CellController } from './cell.controller';
import { CellService } from './cell.service';

@Module({
  imports: [PrismaModule, NotebooksModule],
  controllers: [CellController],
  providers: [CellService],
})
export class CellModule {}
