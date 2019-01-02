class DragAndDrop {
  setEvent(event) {
    this.clear();
    this.event = event;
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

  getTarget() {
    return BackgroundElementBuilder.generateElement(this.event);
  }

  toJson() {
    return {
      target: this.getTarget(),
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
      this.dragAndDrop.setEvent(e);
      this.dragAndDrop.setStart(e.screenX, e.screenY);
    })
  }

  registerDropEvent() {
    document.addEventListener("dragend", (e) => {
      if (this.dragAndDrop.event.target !== e.target) {
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