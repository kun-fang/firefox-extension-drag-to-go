import React from "react";

import { OptionSelect } from "./option_select.jsx";
import { getAllowedBehaviorForType } from "../common/behavior.js";
import { Direction } from "../common/direction.js";


export const ELEMENT_NAME_MAP = {
  "anchor": "Link",
  "img": "Image",
  "text": "Text"
};


export class OptionSection extends React.Component {
  constructor(props) {
    super(props);
    this.elementType = props.type;
    this.state = {
      behaviors: props.behaviors
    };
    this.setOption = this.setOption.bind(this);
  }

  setOption(direction, action) {
    this.props.onChange(this.elementType, direction, action);
  }

  createOptionSelects() {
    return Direction.symbols().map(direction => {
      return (
        <OptionSelect direction={direction}
          action={this.state.behaviors[direction]}
          values={Object.keys(getAllowedBehaviorForType(this.elementType))}
          onChange={this.setOption}
          key={"select-" + this.elementType + "-" + direction} />
      );
    });
  }

  render() {
    return (
      <div>
        <header className="panel-section panel-section-header">
          <h4>Select Behaviors for {ELEMENT_NAME_MAP[this.elementType]}</h4>
        </header>
        <div className="panel-section panel-section-formElements">
          {this.createOptionSelects()}
        </div>
      </div>
    );
  }
}