import { IsString, IsOptional, IsEnum, IsArray, IsJSON } from 'class-validator';

export enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  PROTECTED = 'PROTECTED',
}

export enum NotebookStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

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
  @IsEnum(Visibility)
  visibility?: Visibility = Visibility.PRIVATE;

  @IsOptional()
  @IsEnum(NotebookStatus)
  status?: NotebookStatus = NotebookStatus.DRAFT;

  @IsOptional()
  @IsJSON()
  documents?: Record<string, unknown>;

  @IsOptional()
  @IsJSON()
  settings?: Record<string, unknown>;
}
