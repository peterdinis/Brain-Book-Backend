import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CellType } from 'src/generated/enums';

export class CreateCellDto {
  @IsEnum(CellType)
  type: CellType;

  @IsString()
  content: string;

  @IsOptional()
  metadata?: Record<string, unknown>;
}