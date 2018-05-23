function getUnderlyingImages (element) {
  images = [];
  for (var i = 0; i < element.children.length; i += 1) {
    var item = element.children[i];
    if (item instanceof HTMLImageElement) {
      images.push(item);
    }
  }
  return images;
}

class BackgroundElementBuilder {
  static generateElement(element) {
    if (element instanceof HTMLImageElement) {
      return {
        "type": "img",
        "src": element.src,
        "link": element.src
      };
    }
    if (element instanceof HTMLAnchorElement) {
      images = getUnderlyingImages(element);
      if (element.children.length == 0 && images.length == 0) {
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
    if (element instanceof Text) {
      return {
        "type": "text",
        "text:": element.textContent
      }
    }
    return {};
  }
}