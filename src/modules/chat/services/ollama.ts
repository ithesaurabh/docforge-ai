import { Ollama } from "@langchain/ollama";
import type { ChatModel } from "../interface.js";
import llmConfig from "../../../config/llm.js";

const model = new Ollama({
    model: llmConfig.OLLAMA_CHAT_MODEL,
    temperature: 0,
});

export const ollamaChatModel: ChatModel = {
    async generate(prompt: string): Promise<string> {
        const response = await model.invoke(prompt);

        return response.trim();
    },
};