import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CellType } from 'src/generated/enums';
import { Prisma } from 'src/generated/client';

export class CreateCellDto {
  @IsEnum(CellType)
  type: CellType;

  @IsString()
  content: string;

  @IsOptional()
  metadata?: Prisma.InputJsonValue;
}
