import fs from "fs/promises";

import type {
    DocumentParser,
    ParsedDocument,
} from "./interface.js";

export const txtParser: DocumentParser = {
    async parse(filePath: string): Promise<ParsedDocument> {
        const content = (await fs.readFile(filePath, "utf-8")).trim();

        return {
            content,
            pages: [
                {
                    pageNumber: 1,
                    text: content,
                },
            ],
        };
    },
};