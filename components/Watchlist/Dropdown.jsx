import React from 'react';

const ListItem = (props) => {
  return (
    <option value={props.value}>{props.value}</option>
  )
}

const Dropdown = (props) => {

  const listItems = props.values.map((value) =>
    <ListItem value={value} />
  );

  return (
    <div>
      <label>
        {props.listName}:
        <br></br>
        <select class='dropdown' onChange={props.updateList}>
          {listItems}
        </select>
      </label>
    </div>
  )
}

export default Dropdown;