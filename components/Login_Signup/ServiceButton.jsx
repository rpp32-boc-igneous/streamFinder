import React from "react";
import { userState } from "react";

function ServiceButton(props) {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (e) => {
    setChecked(!checked);
    props.handleStreamSelect(e);
  };

  const stream = props.service;
  let streamName = "";
  switch (stream) {
    case "netflix":
      streamName = "Netflix";
      break;
    case "hulu":
      streamName = "Hulu";
      break;
    case "amazon-prime":
      streamName = "Amazon Prime";
      break;
    case "vudu":
      streamName = "Vudu";
      break;
    case "HBOmax":
      streamName = "HBOmax";
      break;
    case "disney-plus":
      streamName = "Disney Plus";
      break;
    case "peacock":
      streamName = "Peacock";
      break;
    case "paramount-plus":
      streamName = "Paramount Plus";
      break;
    case "AMC-plus":
      streamName = "AMC Plus";
      break;
  }

  return (
    <div id="stream-button-at-signup">
      <input
        type="checkbox"
        value={props.service}
        name="stream"
        label={streamName}
        onChange={handleChange}
        checked={checked}
      />{" "}
      {streamName}
    </div>
  );
}

export default ServiceButton;
