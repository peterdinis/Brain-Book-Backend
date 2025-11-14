import { IsArray, IsString } from 'class-validator';

export class BulkDeleteCellsDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}