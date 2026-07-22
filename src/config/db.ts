import dotenv from "dotenv";

dotenv.config();

const db = {
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || "",
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || "",
    SUPER_ADMIN_NAME: process.env.SUPER_ADMIN_NAME || "Saurabh Kumar Jha",

    STAFF_EMAIL:process.env.STAFF_EMAIL || "",
    STAFF_PASSWORD:process.env.STAFF_PASSWORD || "",
    STAFF_NAME:process.env.STAFF_NAME || "Alister Cook"
};
export default db;