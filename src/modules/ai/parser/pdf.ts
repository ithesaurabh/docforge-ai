import fs from "fs/promises";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import type { DocumentParser, ParsedPage } from "./interface.js";

export const pdfParser: DocumentParser = {
    async parse(filePath: string) {
        const buffer = await fs.readFile(filePath);

        const pdf = await getDocument({
            data: new Uint8Array(buffer),
        }).promise;

        const pages: ParsedPage[] = [];

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);

            const content = await page.getTextContent();

            const text = content.items
                .map((item) => ("str" in item ? item.str : ""))
                .join(" ")
                .trim();

            pages.push({
                pageNumber,
                text,
            });
        }

        return {
            content: pages.map((page) => page.text).join("\n\n"),
            pages,
        };
    },
};