import { V4 } from "paseto";
import crypto from "crypto";
import fs from "fs";

const privateKey = await V4.generateKey("public");
const publicKey = crypto.createPublicKey(privateKey);

fs.writeFileSync("secrets/private.pem", privateKey.export({ format: "pem", type: "pkcs8" }));
fs.writeFileSync("secrets/public.pem", publicKey.export({ format: "pem", type: "spki" }));

console.log("Keys generated");