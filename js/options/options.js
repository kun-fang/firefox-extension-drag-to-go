var tabNameMap = {
  "anchor": "Link",
  "img": "Image",
  "text": "Text"
};


var changeState = function (dragToGoConfig, type, direction, newAction) {
  dragToGoConfig.forEach(config => {
    if (config.optionType !== type) {
      return;
    }
    config.options.forEach(action => {
      if (action.direction !== direction) {
        return;
      }
      action.action = newAction
    })
  })
}


var saveState = function (dragToGoConfig) {
  saveOptions(dragToGoConfig);
}


class DragToGoOptionsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsList: props.options
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    changeState(this.state.optionsList, event.target.getAttribute('type'), event.target.getAttribute('direction'), event.target.value);
  }

  handleClick(event) {
    event.preventDefault();
    saveState(this.state.optionsList);
  }

  getTabId(key) {
    return "nav-" + key;
  }

  getNavTabs(optionsList) {
    return optionsList.map((options, index) => React.createElement(
      "a",
      {
        className: "nav-item nav-link" + (index == 0 ? " active": ""),
        "data-toggle": "tab",
        href: "#" + this.getTabId(options.optionType),
        key: this.getTabId(options.optionType)
      },
      tabNameMap[options.optionType]
    ));
  }

  getNavContents(optionsList) {
    return optionsList.map((options, index) => React.createElement(
      "div",
      {
        className: "tab-pane fade" + (index == 0 ? " show active": ""),
        id: this.getTabId(options.optionType),
        key: this.getTabId(options.optionType)
      },
      React.createElement(
        "h5",
        null,
        "Set up drag and drop behavior for ",
        tabNameMap[options.optionType].toLowerCase()
      ),
      React.createElement(DragToGoOptionsForm, {
        options: options,
        onChange: this.handleChange,
        onClick: this.handleClick
      })
    ));
  }

  render() {
    var navTabs = this.getNavTabs(this.state.optionsList);
    var navContents = this.getNavContents(this.state.optionsList);
    return React.createElement(
      "div",
      { className: "card" },
      React.createElement("div", { className: "card-header" }, "Drag To Go Settings"),
      React.createElement(
        "div",
        { className: "card-body" },
        React.createElement(
          "nav",
          null,
          React.createElement("div", { className: "nav nav-tabs" }, navTabs)
        ),
        React.createElement("div", { className: "tab-content" }, navContents)
      )
    );
  }
}


class DragToGoOptionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: props.options.options
    };
    this.type = props.options.optionType;
    this.allowedActions = getAllowedActionsForType(this.type);
  }

  createSelect(action) {
    return React.createElement(
      DragToGoOptionsSelect,
      {
        className: "form-control col-sm-9",
        type: this.type,
        direction: action.direction,
        value: action.action,
        values: Object.keys(this.allowedActions).sort(),
        onChange: this.props.onChange
      }
    );
  }

  createSelectFormGroup() {
    return this.state.actions.map((action, index) => React.createElement(
      "div",
      {
        className: "form-group row",
        key: index
      },
      React.createElement(
        "label",
        { className: "col-sm-3 col-form-label" },
        "Drag to ",
        action.direction
      ),
      this.createSelect(action)
    ));
  }

  render() {
    return React.createElement(
      "form",
      null,
      this.createSelectFormGroup(),
      React.createElement(
        "button",
        {
          className: "btn btn-primary",
          onClick: this.props.onClick
        },
        "Save"
      )
    )
  }
}


class DragToGoOptionsSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.onChangeExtra = props.onChange;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.onChangeExtra(event);
  }

  render() {
    var options = this.props.values
        .map(function(option) {
          return React.createElement(
            "option", {
              value: option,
              key: option
            }, option
          );
        });
    return React.createElement(
      "select",
      {
        className: this.props.className,
        type: this.props.type,
        direction: this.props.direction,
        value: this.state.value,
        onChange: this.handleChange
      },
      React.createElement("option", {
        value: undefined,
        key: ""
      }),
      options
    );
  }
}


getOptions().then(options => {
  console.log(options)
  return ReactDOM.render(
    React.createElement(
      DragToGoOptionsTabs, 
      {
        options: options
      }),
    document.getElementById("root")
  )
});
