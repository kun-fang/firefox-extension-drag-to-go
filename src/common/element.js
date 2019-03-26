import { ElementType } from "./element_type.js";


class DragElement {
  constructor(type) {
    if (this.constructor == DragElement) {
      throw new TypeError("NotImplementedError");
    }
    this.type = type;
  }

  toJson() {
    throw new TypeError("NotImplementedError");
  }
}


export class Image extends DragElement {
  constructor(src, link) {
    super(ElementType.img);
    this.src = src;
    this.link = link;
  }

  toJson() {
    return {
      "type": this.type,
      "src": this.src,
      "link": this.link
    };
  }
}


export class Anchor extends DragElement {
  constructor(link) {
    super(ElementType.anchor);
    this.link = link;
  }

  toJson() {
    return {
      "type": this.type,
      "link": this.link
    };
  }
}


export class Text extends DragElement {
  constructor(text) {
    super(ElementType.text);
    this.text = text;
  }

  toJson() {
    return {
      "type": this.type,
      "text": this.text
    };
  }
}
