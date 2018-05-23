var DirectionEnum = Object.freeze({
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
})

function messageHandler(message) {
  var element = message.target;
  var action = elementClassifier.getActionObject()
  action.withElement(element).openLinkInForeground();
}

browser.runtime.onMessage.addListener((message) => {
  messageHandler(message)
})