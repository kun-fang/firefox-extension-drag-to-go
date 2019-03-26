import { DragAndDropHandler } from "./drag_and_drop_handler.js";

import "../icons/drag.png";


const DRAG_AND_DROP_HANDLER = new DragAndDropHandler();

DRAG_AND_DROP_HANDLER.registerDragStartEvent();
DRAG_AND_DROP_HANDLER.registerDropEvent();
