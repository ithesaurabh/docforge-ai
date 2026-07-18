export interface ParsedPage {
    pageNumber: number;
    text: string;
}

export interface ParsedDocument {
    content: string;
    pages: ParsedPage[];
}

export interface DocumentParser {
    parse(filePath: string): Promise<ParsedDocument>;
}