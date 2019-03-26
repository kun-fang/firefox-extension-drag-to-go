import React from "react";

import { OptionSelect } from "./option_select.jsx";
import { getAllowedBehaviorForType } from "../common/behavior.js";
import { Direction } from "../common/direction.js";
import { ELEMENT_NAME_MAP } from "./option_tab_header.jsx";


export class OptionSection extends React.Component {
  constructor(props) {
    super(props);
    this.elementType = props.type;
    this.setOption = this.setOption.bind(this);
  }

  setOption(direction, action) {
    this.props.onChange(this.elementType, direction, action);
  }

  createOptionSelects() {
    return Direction.symbols().map(direction => {
      return (
        <OptionSelect direction={direction}
          action={this.props.behaviors[direction]}
          values={Object.keys(getAllowedBehaviorForType(this.elementType))}
          onChange={this.setOption}
          key={"select-" + this.elementType + "-" + direction} />
      );
    });
  }

  render() {
    return (
      <div className={"tab-pane fade" + (this.props.active ? " show active" : "")} id={this.props.id} role="tabpanel">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Select Behaviors for {ELEMENT_NAME_MAP[this.elementType]}</h5>
            <form>
              {this.createOptionSelects()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}