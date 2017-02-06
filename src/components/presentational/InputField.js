import React, { Component } from 'react';

export default class InputField extends Component {
  handleChange = (event) => {
    this.props.handleChange(this.props.stateKey, event);
  }

  render() {
    let props = this.props;
    let id = props.stateKey;

    return (
      <span>
        <label className="label" htmlFor={id}>{props.labelName}</label>
        <p className="control has-icon has-icon-right">
          <input
            className="input"
            type="text"
            placeholder={props.placeholder}
            value={props.value}
            id={id}
            onChange={this.handleChange}
            />
          <span className="icon is-small">
            <i className={["fa", props.iconClass]}></i>
          </span>
        </p>
      </span>
    );
  }
};
