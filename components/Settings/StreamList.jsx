import React, { useState, useEffect } from "react";
import Stream from "./Stream.jsx";
import { GrAdd } from "react-icons/gr";
import { IoAdd } from "react-icons/io5";

const StreamList = (props) => {
  return (
    <div className="streamList">
      <h1 id="streamTitle">Streams</h1>
      <IoAdd className="add" />
      <div id="streamContainer">
        <input
          className="checkbox"
          type="checkbox"
          value="Netflix"
          name="stream"
        />
        Netflix
        <input
          className="checkbox"
          type="checkbox"
          value="Prime"
          name="stream"
        />
        Prime
        <input
          className="checkbox"
          type="checkbox"
          value="Hulu"
          name="stream"
        />
        Hulu
        <input
          className="checkbox"
          type="checkbox"
          value="HBOmax"
          name="stream"
        />
        HBOmax
        <input
          className="checkbox"
          type="checkbox"
          value="AppleTV"
          name="stream"
        />
        AppleTV
        <input
          className="checkbox"
          type="checkbox"
          value="Vudu"
          name="stream"
        />
        Vudu
        <input
          className="checkbox"
          type="checkbox"
          value="Disney+"
          name="stream"
        />
        Disney+
      </div>
    </div>
  );
};

export default StreamList;
