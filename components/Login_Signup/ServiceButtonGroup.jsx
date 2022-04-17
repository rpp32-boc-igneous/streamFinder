import React from "react";
import ServiceButton from "./ServiceButton.jsx";

function ServiceButtonGroup(props) {
  let group1 = props.services.slice(0, 3);
  let group2 = props.services.slice(3, 6);
  let group3 = props.services.slice(6);

  let style = {
    display: "block",
  };

  return (
    <div>
      {group1.map((stream) => (
        <div style={style}>
          <ServiceButton service_name={stream} />
        </div>
      ))}
      {group2.map((stream) => (
        <div style={style}>
          <ServiceButton service_name={stream} />
        </div>
      ))}
      {group3.map((stream) => (
        <div style={style}>
          <ServiceButton service_name={stream} />
        </div>
      ))}
    </div>
  );
}

export default ServiceButtonGroup;
