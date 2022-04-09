import React, {Fragment} from 'react';
import $ from 'jquery';
import { IoRemoveSharp } from 'react-icons/io5';

const Stream = (props) => {
  const showRemove = (id) => {
    $(id).hasClass('hide') ?
      $(id).removeClass('hide') :
      $(id).addClass('hide')
  };

  const changeCheck = () => {
    if ($(`#store-${props.stream}`).hasClass('subscribed')) {
      $(`#store-${props.stream}`).removeClass('subscribed')
    } else {
      $(`#store-${props.stream}`).addClass('subscribed')
    }

    if ( $(`#sub-${props.stream}`).hasClass('hide')) {
      $(`#sub-${props.stream}`).removeClass('hide');
    } else {
      $(`#sub-${props.stream}`).addClass('hide');
    }

    if ($(`#unsub-${props.stream}`).hasClass('hide')) {
      $(`#unsub-${props.stream}`).removeClass('hide');
    } else {
      $(`#unsub-${props.stream}`).addClass('hide');
    }

  }

  return (
    <div style={{display: 'inline-block'}}>
        <input
          className='checkbox'
          type='checkbox'
          name={props.stream}
          defaultChecked={props.subbed}
          onChange={() => changeCheck()}
        />
        <span
          className='streamLabel'
          id={props.stream}
          onClick={() => showRemove(`#remove-${props.stream}`)}
        >
          {props.stream}
        </span>
        <span
          className='remove-stream'
          onClick={() => props.removeStream(props.stream)}>
          <IoRemoveSharp
            className='remove-stream hide'
            id={`remove-${props.stream}`}
          />
        </span>
    </div>
  )
}

export default Stream;
