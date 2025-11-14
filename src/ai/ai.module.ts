import { Module } from "@nestjs/common";
import { OpenAiService } from "./ai.service";

@Module({
    providers: [OpenAiService],
    exports: [OpenAiService]
})

export class AiModule {}