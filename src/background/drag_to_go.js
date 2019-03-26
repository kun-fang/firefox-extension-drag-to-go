import { Direction } from "../common/direction.js";
import { getAllowedBehaviorForType } from "../common/behavior.js";


class DragToGoElement {
  constructor(element, start, end) {
    this.element = element;
    this.start = start;
    this.end = end;
  }

  getMoveDirection() {
    return {
      "horizontal": this.start.x - this.end.x < 0 ? Direction.RIGHT : Direction.LEFT,
      "vertical": this.start.y - this.end.y < 0 ? Direction.UP : Direction.DOWN
    };
  }

  getType() {
    return this.element.type;
  }

  doAction(dragToGoConfig) {
    var type = this.getType();
    var direction = this.getMoveDirection();
    var behaviorName = dragToGoConfig[type][direction.horizontal] || dragToGoConfig[type][direction.vertical];
    if (behaviorName) {
      getAllowedBehaviorForType(type)[behaviorName].setTarget(this.element).action();
    }
  }
}

export function registerDragAndDropListener(storage) {
  return browser.runtime.onMessage.addListener(message => {
    storage.getOptions().then(dragToGoConfig => {
      console.log(message, dragToGoConfig);
      var dragToGoElement = new DragToGoElement(message.element, message.start, message.end);
      dragToGoElement.doAction(dragToGoConfig);
    });
  });
}


