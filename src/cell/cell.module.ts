import { Module } from "@nestjs/common";
import { NotebooksModule } from "src/notebooks/notebooks.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule, NotebooksModule],
    controllers: [],
    providers: []
})

export class CellModule {}