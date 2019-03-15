class Action {
  withElement(element) {
    this.element = element;
    return this;
  }

  constructor(action_function) {
    this.action = action_function;
  }
}


function getCurrentTab() {
  return browser.tabs.query({currentWindow: true, active: true}).then(tabs => tabs[0]);
}


class DragAndDropActionBase {
  openUrlInBackgroundWithSameContainer(url) {
    getCurrentTab().then(tab => browser.tabs.create({
      active: false,
      url: url,
      cookieStoreId: tab.cookieStoreId
    }));
  }

  openUrlInForegroundWithSameContainer(url) {
    getCurrentTab().then(tab => browser.tabs.create({
      active: true,
      url: url,
      cookieStoreId: tab.cookieStoreId
    }));
  }

  openUrlInBackground(url) {
    browser.tabs.create({
      active: false,
      url: url,
    });
  }

  openUrlInForeground(url) {
    browser.tabs.create({
      active: true,
      url: url,
    });
  }

  searchInNewTab(query) {
    browser.search.search({
      query: query
    });
  }

  saveFile(url) {
    browser.downloads.download({
      url: url,
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

  openLinkInBackgroundWithSameContainer() {
    return super.openUrlInBackgroundWithSameContainer(this.element.link);
  }

  openLinkInForegroundWithSameContainer() {
    return super.openUrlInForegroundWithSameContainer(this.element.link);
  }

  getAllowedActions() {
    return {
      "Open Link in Background": new Action(this.openLinkInBackground),
      "Open Link in Foreground": new Action(this.openLinkInForeground),
      "Open Link in Background within the Same Container": new Action(this.openLinkInBackgroundWithSameContainer),
      "Open Link in Foreground within the Same Container": new Action(this.openLinkInForegroundWithSameContainer)
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

  saveImage() {
    return super.saveFile(this.element.src);
  }

  getAllowedActions() {
    return {
      "Save Image": new Action(this.saveImage),
      "Open Image in Background": new Action(this.openImageInBackground),
      "Open Image in Foreground": new Action(this.openImageInForeground),
      "Open Link in Background": new Action(this.openLinkInBackground),
      "Open Link in Foreground": new Action(this.openLinkInForeground)
    };
  }
}


class TextAction extends DragAndDropActionBase {

  search() {
    super.searchInNewTab(this.element["text:"]);
  }

  getAllowedActions() {
    return {
      "Search in New Tab":  new Action(this.search)
    };
  }
}


var registeredActionMapping = {
    "img": new ImageAction(),
    "anchor": new LinkAction(),
    "text": new TextAction()
}


var getAllowedActionsForType = function(type) {
  return registeredActionMapping[type].getAllowedActions();
}