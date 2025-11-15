import { IsEnum } from 'class-validator';
import { NotebookStatus as PrismaNotebookStatus } from 'src/generated/enums';

export class FilterNotebookStatusDto {
  @IsEnum(PrismaNotebookStatus, { message: 'Invalid notebook status' })
  status: PrismaNotebookStatus;
}
