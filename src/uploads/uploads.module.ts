import { Module } from "@nestjs/common";
import { UploadController } from "./uploads.controller";
import { UploadService } from "./uploads.service";

@Module({
    imports: [],
    controllers: [UploadController],
    providers: [UploadService]
})

export class UploadsModule {}