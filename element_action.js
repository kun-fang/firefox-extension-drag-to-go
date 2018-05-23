class Action {
  constructor(name, action) {
    this.name = name;
    this.action = action;
  }
}

class DragAndDropActionBase {
  withElement(element) {
    this.element = element;
    return this;
  }

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
    return [];
  }
}


class LinkAction extends DragAndDropActionBase {

  openLinkInBackground() {
    return this.openUrlInBackground(this.element.link);
  }

  openLinkInForeground() {
    return this.openUrlInForeground(this.element.link);
  }

  getAllowedActions() {
    return [
      new Action("Open Link in Background", this.openLinkInBackground),
      new Action("Open Link in Foreground", this.openLinkInForeground)
    ]
  }
}

var linkAction = new LinkAction();


class ElementClassifier {
  withElement(element) {
    this.element = element;
    return this;
  }

  getActionObject() {
    return linkAction.withElement(this.element);
  }
}

var elementClassifier = new ElementClassifier();