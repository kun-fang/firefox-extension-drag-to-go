var storageKey = "dragToGoOptions";


var DirectionEnum = Object.freeze({
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  symbols: function() {
    return ["UP", "DOWN", "LEFT", "RIGHT"];
  }
});


var DragElementTypeEnum = Object.freeze({
  anchor: "anchor",
  img: "img",
  text: "text",
  symbols: function() {
    return ["anchor", "img", "text"];
  }
});


class DragToGoOptionModel {
  constructor(optionType, options) {
    this.optionType = optionType;
    this.options = DirectionEnum.symbols()
        .map(key => {
          return {
            "direction": DirectionEnum[key],
            "action": options[key]
          };
        });
  }

  toJson() {
    return {
      "type": this.optionType,
      "options": this.options.reduce((map, option) => {
        if (!!option.action) {
          map[option.direction] = option.action;
        }
        return map;
      }, {})
    }
  }
}


var saveOptions = function(optionList) {
  var optionsJson = optionList.reduce((map, option) => {
    map[option.optionType] = option.toJson();
    return map;
  }, {});
  var storage = {};
  storage[storageKey] = optionsJson;
  return browser.storage.local.set(storage);
}


var getOptions = function() {
  options = [];
  return browser.storage.local.get(storageKey)
      .then(response => response[storageKey] || {})
      .then(optionsJson => DragElementTypeEnum.symbols().map(key => {
          if (!optionsJson[key]) {
            return new DragToGoOptionModel(DragElementTypeEnum[key], {});
          } else {
            return new DragToGoOptionModel(DragElementTypeEnum[key], optionsJson[key].options);
          }
        })
      );
}
