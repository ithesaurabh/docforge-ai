import IORedis from "ioredis";
import redisConfig from "../../config/redis.js";

// @ts-expect-error TS6 construct signature issue with ioredis
const connection = new IORedis({
    host: redisConfig.HOST,
    port: redisConfig.PORT,
    maxRetriesPerRequest: null,
});

export default connection;