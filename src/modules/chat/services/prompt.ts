import type {
    PromptBuilder,
} from "../interface.js";

export const promptBuilder: PromptBuilder = {
    build(question, chunks) {
        const context = chunks
            .map(
                (chunk, index) => `
                    [Source ${index + 1}]
                    Document: ${chunk.documentId}
                    Page: ${chunk.page}
                    ${chunk.content}`
            ).join("\n------------------------\n");

        return `You are an AI assistant for document question answering.

            Use ONLY the information provided in the context below.

            If the answer cannot be found in the context, reply exactly:

            "I couldn't find that information in the provided documents."

            Be concise and factual.

            ======================
            CONTEXT
            ======================

            ${context}

            ======================
            QUESTION
            ======================

            ${question}

            ======================
            ANSWER
            ======================`;
    },
};