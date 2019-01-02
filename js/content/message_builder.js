function getUnderlyingImages(element) {
  queue = [element];
  while (queue.length > 0) {
    new_queue = [];
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


class BackgroundElementBuilder {
  static generateElement(event) {
    var element = event.target;
    if (element instanceof HTMLImageElement) {
      return {
        "type": "img",
        "src": element.src,
        "link": element.src
      };
    }
    if (element instanceof HTMLAnchorElement) {
      var images = getUnderlyingImages(element);
      if (element.children.length == 0 || images.length == 0) {
        return {
          "type": "anchor",
          "link": element.href
        }
      } else {
        return {
          "type": "img",
          "src": images[0].src,
          "link": element.href
        }
      }
    }
    else {
      return {
        "type": "text",
        "text:": event.dataTransfer.getData("Text")
      }
    }
    return {};
  }
}
