import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotebookDto, NotebookStatus } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { Notebook, Prisma } from 'src/generated/browser';
import { NotebookQueryDto } from './dto/pagination-notebook.dto';
import { UpdateNotebookStatusDto } from './dto/update-notebook-status.dto';

@Injectable()
export class NotebooksService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateNotebookDto): Promise<Notebook> {
        const data = {
            ...dto,
            tags: dto.tags || [],
            documents: dto.documents || {},
            settings: dto.settings || {},
        };
        return this.prisma.notebook.create({ data });
    }

    async findAll(query: NotebookQueryDto): Promise<{ data: Notebook[]; total: number }> {
        const { page = 1, limit = 10, search } = query;
        const skip = (page - 1) * limit;

        const where: Prisma.NotebookWhereInput = search
            ? { OR: [{ title: { contains: search } }] }
            : {};

        const [data, total] = await Promise.all([
            this.prisma.notebook.findMany({
                where,
                skip,
                take: limit,
                orderBy: { updatedAt: 'desc' },
            }),
            this.prisma.notebook.count({ where }),
        ]);

        return { data, total };
    }

    async findOne(id: string): Promise<Notebook> {
        const notebook = await this.prisma.notebook.findUnique({ where: { id } });
        if (!notebook) throw new NotFoundException(`Notebook with ID ${id} not found`);
        return notebook;
    }

    async update(id: string, dto: UpdateNotebookDto): Promise<Notebook> {
        try {
            return await this.prisma.notebook.update({
                where: { id },
                data: dto,
            });
        } catch (error) {
            if (
                error.code === 'P2025'
            ) {
                throw new NotFoundException(`Cannot update notebook. Notebook with ID ${id} not found`);
            }
            throw new InternalServerErrorException('Failed to update notebook');
        }
    }

    async remove(id: string): Promise<Notebook> {
        try {
            return await this.prisma.notebook.delete({ where: { id } });
        } catch (error) {
            if (
                error.code === 'P2025'
            ) {
                throw new NotFoundException(`Cannot delete notebook. Notebook with ID ${id} not found`);
            }
            throw new InternalServerErrorException('Failed to delete notebook');
        }
    }

    async updateStatus(id: string, statusDto: UpdateNotebookStatusDto): Promise<Notebook> {
        try {
            return await this.prisma.notebook.update({
                where: { id },
                data: { status: statusDto.status },
            });
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException(`Cannot update notebook. Notebook with ID ${id} not found`);
            }
            throw new InternalServerErrorException('Failed to update notebook status');
        }
    }

    async findByStatus(status: NotebookStatus, page = 1, limit = 10): Promise<{ data: Notebook[]; total: number }> {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prisma.notebook.findMany({
                where: { status },
                skip,
                take: limit,
                orderBy: { updatedAt: 'desc' },
            }),
            this.prisma.notebook.count({ where: { status } }),
        ]);

        return { data, total };
    }

}
