import React from "react";
import { selectOptionDisplay , directionMap } from "./display_mapping.js";


export class OptionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.setOption = this.setOption.bind(this);
  }

  setOption(event) {
    this.props.onChange(this.props.direction, event.target.value);
  }

  createOptions() {
    return this.props.values.map(actionName => {
      return <option value={actionName} key={actionName}>{selectOptionDisplay[actionName]}</option>;
    });
  }

  render() {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label text-xl-right">{directionMap[this.props.direction]}</label>
        <div className="col-sm-10">
          <select className="form-control" value={this.props.action} onChange={this.setOption}>
            <option value="">Disabled Behavior</option>
            {this.createOptions()}
          </select>
        </div>
      </div>
    );
  }
}