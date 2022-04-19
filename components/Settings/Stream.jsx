import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { IoRemoveSharp } from 'react-icons/io5';

const Stream = (props) => {
  const [iconClass, setIconClass ] = useState('remove-stream hide');
  const [stream, setStream] = useState(props.stream);

  useEffect(() => {
    setStream(props.stream)
    // setIconClass('remove-stream hide')
  }, [props.stream])

  const showRemove = () => {
    iconClass.includes('hide') ?
      setIconClass('remove-stream') :
      setIconClass('remove-stream hide')
  };

  let Checkbox;
  let name = props.format(stream.name);

  console.log('stream subbed', props.subbed)

  // if (stream.default) {
   Checkbox = (
      <input
        className='checkbox'
        type='checkbox'
        name={stream.name}
        defaultChecked={props.subbed}
        onClick={() => props.changeSubscription(props.stream)}
      />
    );
  // } else {
  //  Checkbox = (
  //   <input
  //     className='checkbox'
  //     type='checkbox'
  //     name={stream.name}
  //     checked={true}
  //     readOnly={true}
  //   />
  //   )
  // }

  return (
    <div id={stream._id} className='stream hide'>
      {Checkbox}
      <span
        className='stream-label'
        onClick={() => showRemove(`#${stream._id}`)}
        // onClick={() => props.removeIcon(stream._id)}
      >
        {name}
        <span className='hover-text'>Delete</span>
      </span>
      <span
        className='remove-stream'
        onClick={() => props.removeStream(stream.name, stream._id, stream.default)}
      >
        <IoRemoveSharp
          // className='remove-stream hide'
          className={iconClass}
        />
      </span>
    </div>
  )
}

export default Stream;