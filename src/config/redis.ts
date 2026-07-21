import dotenv from "dotenv";

dotenv.config();

const redis = {
    URL:process.env.REDIS_URL || "redis://localhost:6379",
    HOST: process.env.REDIS_HOST || "localhost",
    PORT: process.env.REDIS_PORT || 6379
};
export default redis;