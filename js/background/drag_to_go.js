
function getDragToGoOptions() {
  return getOptions().then(optionList => optionList.reduce((map, option) => {
    var optionJson = option.toJson();
    map[optionJson.type] = optionJson.options;
    return map;
  }, {}));
}


function getMoveDirection(message) {
  return {
    "horizontal": message.startX - message.endX < 0 ? DirectionEnum.RIGHT : DirectionEnum.LEFT,
    "vertical": message.startY - message.endY < 0 ? DirectionEnum.UP : DirectionEnum.DOWN
  }
}


function getActionObject(type) {
  return registeredActionMapping[type];
}


function getElementType(element) {
  if (element.type === 'img' || element.type === 'anchor' || element.type === 'text') {
    return element.type;
  }
  if (!!element["text:"]) {
    return "text";
  }
}


browser.runtime.onMessage.addListener(message => {
  getDragToGoOptions().then(dragToGoConfig => {
    var element = message.target;
    var type = getElementType(element);
    var action = getActionObject(type);
    var direction = getMoveDirection(message);

    var actionName = dragToGoConfig[type][direction.horizontal] || dragToGoConfig[type][direction.vertical];
    action.getAllowedActions()[actionName].withElement(element).action();
  });
});
