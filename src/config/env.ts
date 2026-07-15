import dotenv from "dotenv";

dotenv.config();

const env = {
    NODE_ENV:process.env.NODE_ENV || "production",
    DATABASE_URL:process.env.DATABASE_URL || "",
    PORT:process.env.PORT || 3000,
};

export default env;