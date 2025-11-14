import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateCellDto } from './update-cell.dto';

export class BulkUpdateCellItem {
  id: string;

  @ValidateNested()
  @Type(() => UpdateCellDto)
  data: UpdateCellDto;
}

export class BulkUpdateCellsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkUpdateCellItem)
  items: BulkUpdateCellItem[];
}