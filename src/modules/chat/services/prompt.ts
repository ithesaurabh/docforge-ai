import type {PromptBuilder, } from "../interface.js";
export const promptBuilder: PromptBuilder = {

    build(question, chunks, history) {

        const context = chunks
            .map((chunk, index) => `
                [Source ${index + 1}]
                Document: ${chunk.documentId}
                Page: ${chunk.page}
                ${chunk.content}`)
            .join("\n------------------------\n");

        const conversationHistory = history.map((message) =>
                    `${message.role}: ${message.content}`).join("\n");
        return `
                You are an AI assistant for document question answering.

                Rules:
                - Use ONLY the provided document context for factual answers.
                - Use conversation history only to understand references like "he", "it", "that".
                - If the answer cannot be found in the documents, reply exactly:

                "I couldn't find that information in the provided documents."

                - Be concise and factual.


                ======================
                CONVERSATION HISTORY
                ======================

                ${conversationHistory || "No previous conversation."}


                ======================
                DOCUMENT CONTEXT
                ======================

                ${context}


                ======================
                CURRENT QUESTION
                ======================

                ${question}


                ======================
                ANSWER
                ======================
`;
    },
};