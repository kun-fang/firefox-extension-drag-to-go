import { Action } from "./action.js";
import { ElementType } from "./element_type.js";


function getCurrentTab() {
  return browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(tabs => tabs[0]);
}


function openUrlInBackground(url) {
  return browser.tabs.create({
    active: false,
    url: url
  });
}


function openUrlInForeground(url) {
  return browser.tabs.create({
    active: true,
    url: url
  });
}


function openUrlInBackgroundWithSameContainer(url) {
  return getCurrentTab().then(tab => browser.tabs.create({
    active: false,
    url: url,
    cookieStoreId: tab.cookieStoreId
  }));
}


function openUrlInForegroundWithSameContainer(url) {
  return getCurrentTab().then(tab => browser.tabs.create({
    active: true,
    url: url,
    cookieStoreId: tab.cookieStoreId
  }));
}


function searchWithDefaultSearchEngine(query) {
  return browser.search.search({
    query: query
  });
}


function searchWithGivenEngine(query, engine) {
  return browser.search.search({
    query: query,
    engine: engine
  });
}


function saveFile(url) {
  browser.downloads.download({
    url: url,
  });
}


class Behavior {
  constructor(elementType) {
    if (this.constructor == Behavior) {
      throw new TypeError("NotImplementedError");
    }
    this.elementType = elementType;
  }

  getAllActions() {
    return [];
  }

  getAllowedActions() {
    return this.getAllActions().reduce((map, action) => {
      map[action.name] = action;
      return map;
    }, {});
  }
}


class LinkBehavior extends Behavior {
  constructor() {
    super(ElementType.anchor);
  }

  openLinkInBackground() {
    return openUrlInBackground(this.element.link);
  }

  openLinkInForeground() {
    return openUrlInForeground(this.element.link);
  }

  openLinkInBackgroundWithSameContainer() {
    return openUrlInBackgroundWithSameContainer(this.element.link);
  }

  openLinkInForegroundWithSameContainer() {
    return openUrlInForegroundWithSameContainer(this.element.link);
  }

  getAllActions() {
    return [
      new Action("Open Link in Background",
        this.openLinkInBackground),
      new Action("Open Link in Foreground",
        this.openLinkInForeground),
      new Action("Open Link in Background with Current Container",
        this.openLinkInBackgroundWithSameContainer),
      new Action("Open Link in Foreground with Current Container",
        this.openLinkInForegroundWithSameContainer)
    ];
  }
}


class ImageBehavior extends Behavior {
  constructor() {
    super(ElementType.img);
  }

  openLinkInBackground() {
    return openUrlInBackground(this.element.link);
  }

  openLinkInForeground() {
    return openUrlInForeground(this.element.link);
  }

  openLinkInBackgroundWithSameContainer() {
    return openUrlInBackgroundWithSameContainer(this.element.link);
  }

  openLinkInForegroundWithSameContainer() {
    return openUrlInForegroundWithSameContainer(this.element.link);
  }

  openImageInBackground() {
    return openUrlInBackground(this.element.src);
  }

  openImageInForeground() {
    return openUrlInForeground(this.element.src);
  }

  saveImage() {
    return saveFile(this.element.src);
  }

  getAllActions() {
    return [
      new Action("Save Image",
        this.saveImage),
      new Action("Open Image in Background",
        this.openImageInBackground),
      new Action("Open Image in Foreground",
        this.openImageInForeground),
      new Action("Open Link in Background",
        this.openLinkInBackground),
      new Action("Open Link in Foreground",
        this.openLinkInForeground),
      new Action("Open Link in Background with Current Container",
        this.openLinkInBackgroundWithSameContainer),
      new Action("Open Link in Foreground with Current Container",
        this.openLinkInForegroundWithSameContainer)
    ];
  }
}


class TextBehavior extends Behavior {
  constructor() {
    super(ElementType.text);
  }

  search() {
    searchWithDefaultSearchEngine(this.element.text);
  }

  searchByEngine(engine) {
    searchWithGivenEngine(this.element.text, engine);
  }

  getAllActions() {
    return [
      new Action("Search with Current Engine",
        this.search)
    ];
  }
}


const ALL_BEHAVIOR = [
  new ImageBehavior(),
  new LinkBehavior(),
  new TextBehavior()
];


const BEHAVIOR_MAP = ALL_BEHAVIOR.reduce((map, behavior) => {
  map[behavior.elementType] = behavior;
  return map;
}, {});


export function getAllowedBehaviorForType(elementType) {
  return BEHAVIOR_MAP[elementType].getAllowedActions();
}
