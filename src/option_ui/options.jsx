import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { OptionStorage, STORAGE_KEY } from "../common/option_storage.js";
import { ElementType } from "../common/element_type.js";
import { OptionSection, ELEMENT_NAME_MAP } from "./option_section.jsx";


const store = new OptionStorage(STORAGE_KEY);


class OptionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options
    };
    this.setOption = this.setOption.bind(this);
    this.saveOptions = this.saveOptions.bind(this);
  }

  saveOptions() {
    store.saveOptions(this.state.options);
  }

  setOption(elementType, direction, action) {
    this.setState(state => {
      var options = this.state.options;
      options[elementType][direction] = action;
      return {options: options};
    });
  }

  createPanelHeaders() {
    return ElementType.symbols().map((elementType, index) => {
      return (
        <button className="panel-section-tabs-button" id={"tab-" + elementType} key={"tab-header-" + index}>
          {ELEMENT_NAME_MAP[elementType]}
        </button>
      );
    });
  }

  createPanelContent() {
    return ElementType.symbols().map((elementType, index) => {
      return (
        <OptionSection type={elementType}
          behaviors={this.state.options[elementType]}
          key={"tab-contnet-" + index}
          onChange={this.setOption} />
      );
    });
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state.options)}
        {this.createPanelHeaders()}
        {this.createPanelContent()}
        <button onClick={this.saveOptions}>Save</button>
      </div>
    );
  }
}


store.getOptions().then(options => {
  ReactDOM.render(<OptionContainer options={options} />, document.getElementById("root"));
});
