import React from "react";
import { userState } from "react";

function ServiceButton(props) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (e) => {
    setChecked(!checked);
    props.handleStreamSelect(e);
  };

  return (
    <div>
      <input
        type="checkbox"
        value={props.service}
        name="stream"
        label={props.service}
        onChange={handleChange}
        checked={checked}
      />{" "}
      {props.service}
    </div>
  );
}

export default ServiceButton;
