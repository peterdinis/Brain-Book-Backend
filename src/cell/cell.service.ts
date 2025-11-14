import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotebooksService } from '../notebooks/notebooks.service';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { BulkUpdateCellsDto } from './dto/bulk-update-cell.dto';
import { BulkDeleteCellsDto } from './dto/bulk-delete-cell.dto';

@Injectable()
export class CellService {
  constructor(
    private prisma: PrismaService,
    private notebooksService: NotebooksService,
  ) {}

  //------------------------------------------------------
  // CREATE CELL (append to end)
  //------------------------------------------------------
  async create(notebookId: string, dto: CreateCellDto) {
    await this.notebooksService.findOne(notebookId);

    const last = await this.prisma.cell.findFirst({
      where: { notebookId },
      orderBy: { order: 'desc' },
    });

    return this.prisma.cell.create({
      data: {
        notebookId,
        type: dto.type,
        content: dto.content,
        metadata: dto.metadata,
        order: last ? last.order + 1 : 0,
      },
    });
  }

  //------------------------------------------------------
  // GET ALL NOTEBOOK CELLS
  //------------------------------------------------------
  async findAll(notebookId: string) {
    await this.notebooksService.findOne(notebookId);

    return this.prisma.cell.findMany({
      where: { notebookId },
      orderBy: { order: 'asc' },
    });
  }

  //------------------------------------------------------
  // FIND ONE CELL
  //------------------------------------------------------
  async findOne(id: string) {
    const cell = await this.prisma.cell.findUnique({ where: { id } });

    if (!cell) throw new NotFoundException(`Cell with ID ${id} not found`);

    return cell;
  }

  //------------------------------------------------------
  // UPDATE ONE CELL
  //------------------------------------------------------
  async update(id: string, dto: UpdateCellDto) {
    await this.findOne(id);

    try {
      return this.prisma.cell.update({
        where: { id },
        data: dto,
      });
    } catch {
      throw new InternalServerErrorException(
        'Failed to update cell',
      );
    }
  }

  //------------------------------------------------------
  // BULK UPDATE CELLS
  //------------------------------------------------------
  async bulkUpdate(notebookId: string, dto: BulkUpdateCellsDto) {
    await this.notebooksService.findOne(notebookId);

    const trx = dto.items.map((item) =>
      this.prisma.cell.update({
        where: { id: item.id },
        data: item.data,
      }),
    );

    return this.prisma.$transaction(trx);
  }

  //------------------------------------------------------
  // BULK DELETE CELLS
  //------------------------------------------------------
  async bulkDelete(dto: BulkDeleteCellsDto) {
    return this.prisma.cell.deleteMany({
      where: { id: { in: dto.ids } },
    });
  }

  //------------------------------------------------------
  // DELETE ONE CELL
  //------------------------------------------------------
  async delete(id: string) {
    await this.findOne(id);

    return this.prisma.cell.delete({
      where: { id },
    });
  }
}
