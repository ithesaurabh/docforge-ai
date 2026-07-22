import { V4 } from "paseto";
import crypto from "crypto";
import fs from "fs";


const privateKey = crypto.createPrivateKey(
  fs.readFileSync("./secrets/private.pem", "utf-8")
);

const publicKey = crypto.createPublicKey(
  fs.readFileSync("./secrets/public.pem", "utf-8")
);

export {privateKey, publicKey}