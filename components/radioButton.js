import { React, Component} from "react";

export default class RadioButton extends Component {
    render() {
      const {
        id,
        checked,
        value,
        onChange,
        disabled,
        product,
      } = this.props;
      return (
        <div className="custom-radio">
          <input
            type="radio"
            id={id}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            value={value}
            name={value}
          />
          <div className="toggle" />
        </div>
      );
    }
  }

  