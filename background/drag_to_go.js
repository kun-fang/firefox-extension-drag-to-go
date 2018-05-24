var DirectionEnum = Object.freeze({
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
});

var dragToGoConfig = {
  "img": {
    "LEFT": "Open Image in Foreground",
    "RIGHT": "Open Link in Background"
  },
  "anchor": {
    "LEFT": "Open Link in Foreground",
    "RIGHT": "Open Link in Background"
  }
};

function getMoveDirection(message) {
  return {
    "horizontal": message.startX - message.endX < 0 ? DirectionEnum.RIGHT : DirectionEnum.LEFT,
    "vertial": message.startY - message.endY < 0 ? DirectionEnum.UP : DirectionEnum.DOWN
  }
}

class Action {
  withElement(element) {
    this.element = element;
    return this;
  }

  constructor(action) {
    this.action = action;
  }
}

class DragAndDropActionBase {
  openUrlInBackground(url) {
    browser.tabs.create({
      active: false,
      url: url
    });
  }

  openUrlInForeground(url) {
    browser.tabs.create({
      active: true,
      url: url
    });
  }

  getAllowedActions() {
    return {};
  }
}


class LinkAction extends DragAndDropActionBase {

  openLinkInBackground() {
    return super.openUrlInBackground(this.element.link);
  }

  openLinkInForeground() {
    return super.openUrlInForeground(this.element.link);
  }

  getAllowedActions() {
    return {
      "Open Link in Background": new Action(this.openLinkInBackground),
      "Open Link in Foreground": new Action(this.openLinkInForeground)
    };
  }
}

class ImageAction extends DragAndDropActionBase {

  openLinkInBackground() {
    return super.openUrlInBackground(this.element.link);
  }

  openLinkInForeground() {
    return super.openUrlInForeground(this.element.link);
  }

  openImageInBackground() {
    return super.openUrlInBackground(this.element.src);
  }

  openImageInForeground() {
    return super.openUrlInForeground(this.element.src);
  }

  getAllowedActions() {
    return {
      "Open Image in Background": new Action(this.openImageInBackground),
      "Open Image in Foreground": new Action(this.openImageInForeground),
      "Open Link in Background": new Action(this.openLinkInBackground),
      "Open Link in Foreground": new Action(this.openLinkInForeground)
    };
  }
}

var linkAction = new LinkAction();
var imageAction = new ImageAction();

function getActionObject(type) {
  if (type === 'img') {
    return imageAction;
  }
  if (type === 'anchor') {
    return linkAction;
  }
}

browser.runtime.onMessage.addListener((message) => {
  var element = message.target;
  var action = getActionObject(element.type);
  var direction = getMoveDirection(message);

  var actionName = dragToGoConfig[element.type][direction.horizontal];
  action.getAllowedActions()[actionName].withElement(element).action();
});