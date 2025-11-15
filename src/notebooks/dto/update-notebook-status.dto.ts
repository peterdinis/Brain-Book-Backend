import { IsEnum } from 'class-validator';
import { NotebookStatus as PrismaNotebookStatus } from 'src/generated/enums';

export class UpdateNotebookStatusDto {
  @IsEnum(PrismaNotebookStatus, { message: 'Invalid notebook status' })
  status: PrismaNotebookStatus;
}
