import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CellService } from './cell.service';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { BulkUpdateCellsDto } from './dto/bulk-update-cell.dto';
import { BulkDeleteCellsDto } from './dto/bulk-delete-cell.dto';

@ApiTags('Cells')
@Controller('notebooks/:notebookId/cells')
export class CellController {
  constructor(private cellService: CellService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cell in notebook' })
  @ApiParam({ name: 'notebookId', type: String, description: 'Notebook ID' })
  @ApiBody({ type: CreateCellDto })
  @ApiResponse({ status: 201, description: 'Cell created', type: Object })
  create(@Param('notebookId') notebookId: string, @Body() dto: CreateCellDto) {
    return this.cellService.create(notebookId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cells of a notebook' })
  @ApiParam({ name: 'notebookId', type: String, description: 'Notebook ID' })
  @ApiResponse({ status: 200, description: 'List of cells', type: [Object] })
  findAll(@Param('notebookId') notebookId: string) {
    return this.cellService.findAll(notebookId);
  }

  @Patch(':cellId')
  @ApiOperation({ summary: 'Update one cell by ID' })
  @ApiParam({ name: 'cellId', type: String, description: 'Cell ID' })
  @ApiBody({ type: UpdateCellDto })
  @ApiResponse({ status: 200, description: 'Updated cell', type: Object })
  update(@Param('cellId') cellId: string, @Body() dto: UpdateCellDto) {
    return this.cellService.update(cellId, dto);
  }

  @Post('bulk-update')
  @ApiOperation({ summary: 'Bulk update multiple cells' })
  @ApiParam({ name: 'notebookId', type: String, description: 'Notebook ID' })
  @ApiBody({ type: BulkUpdateCellsDto })
  @ApiResponse({ status: 200, description: 'Updated cells', type: [Object] })
  bulkUpdate(
    @Param('notebookId') notebookId: string,
    @Body() dto: BulkUpdateCellsDto,
  ) {
    return this.cellService.bulkUpdate(notebookId, dto);
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk delete multiple cells' })
  @ApiBody({ type: BulkDeleteCellsDto })
  @ApiResponse({ status: 200, description: 'Cells deleted', type: Object })
  bulkDelete(@Body() dto: BulkDeleteCellsDto) {
    return this.cellService.bulkDelete(dto);
  }

  @Delete(':cellId')
  @ApiOperation({ summary: 'Delete a cell by ID' })
  @ApiParam({ name: 'cellId', type: String, description: 'Cell ID' })
  @ApiResponse({ status: 200, description: 'Deleted cell', type: Object })
  delete(@Param('cellId') cellId: string) {
    return this.cellService.delete(cellId);
  }
}
