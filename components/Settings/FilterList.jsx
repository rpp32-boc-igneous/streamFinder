import React, { useState, useEffect } from "react";
// import Filter from "./Filter.jsx";

const FilterList = (props) => {
  return (
    <div>
      <span>
        <input type="checkbox" />
        no ads
      </span>
      <span>
        <input type="checkbox" />
        free
      </span>
      <span>
        <input type="checkbox" />
        monthly subscription
      </span>
    </div>
  );
};

export default FilterList;
