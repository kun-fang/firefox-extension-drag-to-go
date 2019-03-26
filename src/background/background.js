import { OptionStorage, STORAGE_KEY } from "../common/option_storage.js";
import { registerDragAndDropListener } from "./drag_to_go.js";

registerDragAndDropListener(new OptionStorage(STORAGE_KEY));
