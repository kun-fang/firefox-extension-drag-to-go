import { Image, Anchor, Text } from "../common/element.js";


class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toJson() {
    return {
      "x": this.x,
      "y": this.y
    };
  }
}


function getUnderlyingImages(dom) {
  var queue = [dom];
  while (queue.length > 0) {
    var new_queue = [];
    for (var i = 0; i < queue.length; i += 1) {
      var item = queue[i];
      if (item instanceof HTMLImageElement) {
        return [item];
      } else {
        for (var j = 0; j < item.children.length; j += 1) {
          new_queue.push(item.children[j]);
        }
      }
    }
    queue = new_queue;
  }
  return [];
}


function buildElement(event) {
  var dom = event.target;
  var textString = event.dataTransfer.getData("text");
  if (dom instanceof HTMLImageElement) {
    return new Image(dom.src, dom.src);
  } else if (dom instanceof HTMLAnchorElement) {
    var images = getUnderlyingImages(dom);
    return images.length == 0 ? new Anchor(dom.href) : new Image(images[0].src, dom.href);
  } else if (textString) {
    return new Text(textString);
  }
  return undefined;
}


export class DragAndDropHandler {

  clear() {
    this.start = undefined;
    this.end = undefined;
    this.target = undefined;
    this.element = undefined;
  }

  toJson() {
    return {
      "start": this.start.toJson(),
      "end": this.end.toJson(),
      "element": this.element.toJson()
    };
  }

  registerDragStartEvent() {
    document.addEventListener("dragstart", (e) => {
      this.clear();
      this.element = buildElement(e);
      this.target = e.target;
      this.start = new Coordinate(e.screenX, e.screenY);
    });
  }

  registerDropEvent() {
    document.addEventListener("dragend", (e) => {
      if (this.target !== e.target) {
        this.clear();
      } else {
        this.end = new Coordinate(e.screenX, e.screenY);
        browser.runtime.sendMessage(this.toJson());
      }
    });
  }
}
