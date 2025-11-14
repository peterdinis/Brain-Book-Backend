import { Injectable } from "@nestjs/common";
import { OpenAI } from "openai";

@Injectable()
export class OpenAiService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    async analyzeText(text: string) {
        const prompt = `Analyze the following text and provide a summary with key insights:\n\n${text}`;

        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        return response.choices?.[0]?.message?.content ?? '';
    }
}