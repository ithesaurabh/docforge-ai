import  storageConfig  from "../../../config/storage.js";

import type { StorageService } from "../interfaces/storage.js";
import { LocalStorageService } from "./local-storage.js";

export class StorageFactory {
    static create(): StorageService {
        switch (storageConfig.PROVIDER) {
            case "LOCAL":
            default:
                return new LocalStorageService();
        }
    }
}