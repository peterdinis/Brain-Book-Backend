import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CellType } from 'src/generated/enums';

export class UpdateCellDto {
  @IsOptional()
  @IsEnum(CellType)
  type?: CellType;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  metadata?: Record<string, unknown>;
}