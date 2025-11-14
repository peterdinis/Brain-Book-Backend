import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { NotebookQueryDto } from './dto/pagination-notebook.dto';
import { Notebook } from 'src/generated/browser';
import { NotebooksService } from './notebooks.service';
import { UpdateNotebookStatusDto } from './dto/update-notebook-status.dto';

@ApiTags('Notebooks')
@Controller('notebooks')
export class NotebooksController {
  constructor(private readonly notebookService: NotebooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notebook' })
  @ApiResponse({
    status: 201,
    description: 'Notebook created',
    type: CreateNotebookDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  create(@Body() dto: CreateNotebookDto): Promise<Notebook> {
    return this.notebookService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notebooks with pagination and search' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of notebooks' })
  findAll(@Query() query: NotebookQueryDto) {
    return this.notebookService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a notebook by ID' })
  @ApiParam({ name: 'id', description: 'Notebook ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Notebook found',
    type: CreateNotebookDto,
  })
  @ApiResponse({ status: 404, description: 'Notebook not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.notebookService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a notebook by ID' })
  @ApiParam({ name: 'id', description: 'Notebook ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Notebook updated',
    type: UpdateNotebookDto,
  })
  @ApiResponse({ status: 404, description: 'Notebook not found' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateNotebookDto,
  ) {
    return this.notebookService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notebook by ID' })
  @ApiParam({ name: 'id', description: 'Notebook ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Notebook deleted',
    type: CreateNotebookDto,
  })
  @ApiResponse({ status: 404, description: 'Notebook not found' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.notebookService.remove(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update notebook status' })
  @ApiParam({ name: 'id', description: 'Notebook ID', type: String })
  @ApiResponse({ status: 200, description: 'Notebook status updated' })
  @ApiResponse({ status: 404, description: 'Notebook not found' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: UpdateNotebookStatusDto,
  ): Promise<Notebook> {
    return this.notebookService.updateStatus(id, statusDto);
  }

  @Get('filter/status')
  @ApiOperation({ summary: 'Filter notebooks by status with pagination' })
  @ApiQuery({
    name: 'status',
    description: 'Notebook status to filter',
    required: true,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Items per page',
    required: false,
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Filtered notebooks returned' })
  filterByStatus(
    @Query('status') status: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.notebookService.findByStatus(
      status as any,
      pageNumber,
      limitNumber,
    );
  }
}
