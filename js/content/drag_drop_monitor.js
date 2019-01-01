class DragAndDrop {
  setTarget(element) {
    this.clear();
    this.element = element;
  }

  setStart(x, y) {
    this.startX = x;
    this.startY = y;
  }

  setEnd(x, y) {
    this.endX = x;
    this.endY = y;
  }

  clear() {
    this.element = undefined;
    this.startX = undefined;
    this.startY = undefined;
    this.endX = undefined;
    this.endY = undefined;
  }

  toJson() {
    return {
      target: BackgroundElementBuilder.generateElement(this.element),
      startX: this.startX,
      startY: this.startY,
      endX: this.endX,
      endY: this.endY
    }
  }
}


class DragAndDropEventHandler {
  constructor(dragAndDrop) {
    this.dragAndDrop = dragAndDrop;
  }

  registerDragStartEvent() {
    document.addEventListener("dragstart", (e) => {
      this.dragAndDrop.setTarget(e.target);
      this.dragAndDrop.setStart(e.screenX, e.screenY);
    })
  }

  registerDropEvent() {
    document.addEventListener("dragend", (e) => {
      if (this.dragAndDrop.element !== e.target) {
        this.dragAndDrop.clear();
      } else {
        this.dragAndDrop.setEnd(e.screenX, e.screenY);
        browser.runtime.sendMessage(this.dragAndDrop.toJson());
      }
    })
  }

}


var dragAndDrop = new DragAndDrop();
var eventHandler = new DragAndDropEventHandler(dragAndDrop);


eventHandler.registerDropEvent();
eventHandler.registerDragStartEvent();