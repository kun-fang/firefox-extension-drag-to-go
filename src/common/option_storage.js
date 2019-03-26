import { Direction } from "./direction.js";
import { ElementType } from "./element_type.js";


export const STORAGE_KEY = "dragToGoOptions";


export class OptionStorage {
  constructor(key) {
    this.key = key;
  }

  getOptions() {
    return browser.storage.local.get(STORAGE_KEY)
      .then(response => response[STORAGE_KEY] || {})
      .then(optionsJson => ElementType.symbols().reduce((map, elementType) => {
        var behaviorJson = optionsJson[elementType] || {};
        map[elementType] = Direction.symbols().reduce((map, direction) => {
          map[direction] = behaviorJson[direction];
          return map;
        }, {});
        return map;
      }, {}));
  }

  saveOptions(optionsJson) {
    var storage = {};
    storage[STORAGE_KEY] = optionsJson;
    return browser.storage.local.set(storage);
  }
}
