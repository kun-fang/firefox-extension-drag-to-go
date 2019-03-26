import React from "react";


export const ELEMENT_NAME_MAP = {
  "anchor": "Links",
  "img": "Images",
  "text": "Texts"
};

export class OptionTabHeader extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.props.onClick(this.props.type);
  }

  render() {
    return (
      <a className={"nav-item nav-link" + (this.props.active ? " active" : "")}
        type={this.props.type}
        id={"tab-" + this.props.type} data-toggle="tab"
        href={"#" + this.props.id}
        onClick={this.onClick}>
        {ELEMENT_NAME_MAP[this.props.type]}
      </a>
    );
  }
}