import React from "react";

function ServiceButton(props) {
  return (
    <div>
      <input
        type="radio"
        value={props.service_name}
        name="stream"
        label={props.service_name}
      />{" "}
      {props.service_name}
    </div>
  );
}

export default ServiceButton;
