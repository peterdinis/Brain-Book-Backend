import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { Prisma } from 'src/generated/client';
import { Visibility as PrismaVisibility, NotebookStatus as PrismaNotebookStatus } from 'src/generated/enums';

export class CreateNotebookDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  userId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsEnum(PrismaVisibility)
  visibility?: PrismaVisibility = PrismaVisibility.PRIVATE;

  @IsOptional()
  @IsEnum(PrismaNotebookStatus)
  status?: PrismaNotebookStatus = PrismaNotebookStatus.DRAFT;

  @IsOptional()
  documents?: Prisma.InputJsonValue;

  @IsOptional()
  settings?: Prisma.InputJsonValue;
}
