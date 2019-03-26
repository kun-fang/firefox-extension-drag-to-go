import React from "react";

const DIRECTION_MAP ={
  "UP": "\u2b06",
  "DOWN": "\u2b07",
  "LEFT": "\u2b05",
  "RIGHT": "\u27a1"
};

export class OptionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: props.action
    };
    this.setOption = this.setOption.bind(this);
  }

  setOption(event) {
    this.props.onChange(this.props.direction, event.target.value);
  }

  createOptions() {
    return this.props.values.map(actionName => {
      return <option value={actionName} key={actionName}>{actionName}</option>;
    });
  }

  render() {
    return (
      <div className="panel-formElements-item">
        <label>{DIRECTION_MAP[this.props.direction]}</label>
        <select value={this.state.action} onChange={this.setOption}>
          <option value="">Disable This Behavior</option>
          {this.createOptions()}
        </select>
      </div>
    );
  }
}