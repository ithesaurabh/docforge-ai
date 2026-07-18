import storageConfig from "../../../config/storage.js";
import { LocalStorageService } from "./local-storage.js";

const createStorageFactory = () => {
    switch (storageConfig.PROVIDER) {
        case "LOCAL":
        default:
            return LocalStorageService;
    }
}
export default {create: createStorageFactory};