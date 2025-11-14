import { IsEnum } from 'class-validator';
import { NotebookStatus } from './create-notebook.dto';

export class UpdateNotebookStatusDto {
  @IsEnum(NotebookStatus, { message: 'Invalid notebook status' })
  status: NotebookStatus;
}
