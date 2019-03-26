import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { OptionStorage, STORAGE_KEY } from "../common/option_storage.js";
import { ElementType } from "../common/element_type.js";
import { OptionSection } from "./option_section.jsx";
import { OptionTabHeader } from "./option_tab_header.jsx";


const store = new OptionStorage(STORAGE_KEY);
const elementTypes = ElementType.symbols();


class OptionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      selectedTab: elementTypes[0]
    };
    this.setOption = this.setOption.bind(this);
    this.saveOptions = this.saveOptions.bind(this);
    this.selectTab = this.selectTab.bind(this);
  }

  saveOptions() {
    store.saveOptions(this.state.options);
  }

  setOption(elementType, direction, action) {
    this.setState(() => {
      var options = this.state.options;
      options[elementType][direction] = action;
      return {options: options};
    });
  }

  selectTab(type) {
    this.setState({
      selectedTab: type
    });
  }

  getTabContentId(elementType) {
    return "tab-content-" + elementType;
  }

  createPanelHeaders() {
    return elementTypes.map(elementType => {
      return (
        <OptionTabHeader type={elementType}
          active={this.state.selectedTab === elementType}
          id={this.getTabContentId(elementType)}
          key={this.getTabContentId(elementType)}
          onClick={this.selectTab} />
      );
    });
  }

  createPanelContent() {
    return elementTypes.map(elementType => {
      return (
        <OptionSection type={elementType}
          active={this.state.selectedTab === elementType}
          behaviors={this.state.options[elementType]}
          id={this.getTabContentId(elementType)}
          key={this.getTabContentId(elementType)}
          onChange={this.setOption} />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="nav flex-column nav-pills col-md-2">
            {this.createPanelHeaders()}
          </div>
          <div className="col-md-10">
            <div className="tab-content">
              {this.createPanelContent()}
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-center">
          <button className="btn btn-info" onClick={this.saveOptions}>Save</button>
        </div>
      </div>
    );
  }
}


store.getOptions().then(options => {
  ReactDOM.render((
    <div className="container">
      <h4>Drag To Go Configurations</h4>
      <hr />
      <OptionContainer options={options} />
    </div>
  ), document.getElementById("root"));
});
