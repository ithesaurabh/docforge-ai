import dotenv from "dotenv";

dotenv.config();

const llm = {
    OLLAMA_CHAT_MODEL :process.env.OLLAMA_CHAT_MODEL  || "llama3.2",
    TOP_K: parseInt(process.env.TOP_K ?? "5"),
};

export default llm;