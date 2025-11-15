import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CellType } from 'src/generated/enums';
import { Prisma } from 'src/generated/client';

export class UpdateCellDto {
  @IsOptional()
  @IsEnum(CellType)
  type?: CellType;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  metadata?:  Prisma.InputJsonValue;
}
