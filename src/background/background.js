import { OptionStorage, STORAGE_KEY } from "../common/option_storage.js";
import { registerDragAndDropListener } from "./drag_to_go.js";

const STORE = new OptionStorage(STORAGE_KEY);

registerDragAndDropListener(STORE.getOptions(STORAGE_KEY));
