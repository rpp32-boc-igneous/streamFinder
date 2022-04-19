import React, { useState, useEffect } from "react";
import $ from 'jquery';
import Option from './Option.jsx';
import { IoAdd } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import { IoCheckmark } from 'react-icons/io5';

const StreamCard = (props) => {

  const [options, setOptions] = useState([' ']);

const formatName = (name) => {
  return name
  .replace(/-/g, ' ')
  .replace(/ plus/g, '+ ')
  .replace(/(?: |\b)(\w)/g, (key) => {
    return key.toUpperCase();
  })
}

const name = formatName(props.stream.name);

  const cost = (typeof props.stream.cost === 'number') ?
  (props.stream.cost > 0 ?
    `$${props.stream.cost}/mo` :
    '') :
    props.stream.cost;

  useEffect(() => {
    if (props.stream.free) setOptions(options => ['Free', ...options]);
    if (props.stream.no_ads) setOptions(options => ['No Ads', ...options]);
    // if (cost) setOptions(options => [...options, cost]);
  }, []);

  const streamSub = () => {
    if(!$(`#store-${props.stream._id}`).hasClass('subscribed')) {
      // $(`#store-${props.stream._id}`).addClass('subscribed');
      // $(`#store-${props.stream._id} .card-add`).addClass('hide');
      // $(`#store-${props.stream._id} .card-remove`).removeClass('hide');
      $(`#${props.stream._id}`).prop('checked', true);
      props.addStream(props.stream);
    } else {
      if (props.stream.default) props.unsubscribe(props.stream.name, props.stream._id, props.stream.default)
      else props.removeStream(props.stream.name, props.stream._id, props.stream.default);
      // $(`#store-${props.stream._id}`).removeClass('subscribed');
      // $(`#store-${props.stream._id} .card-add`).removeClass('hide');
      // $(`#store-${props.stream._id} .card-remove`).addClass('hide');
    }
  }

  const classes = props.subbed(props.stream.name) ?
  'stream-card subscribed' : 'stream-card'

  return (
    <div className={classes} id={`store-${props.stream._id}`} onClick={() => streamSub()} >
      {/* <span
        className='card-icon'
        // onClick={() => streamSub()}
      >
        <IoAdd className='card-icon card-add' }/>
        <AiOutlineClose className='card-icon card-remove hide' }/>
      </span> */}
        <img src={props.stream.logo}
        className='stream-img'
      />
      <div className='stream-info'>
      <div className='stream-title'>{name}</div>
        <div>
          {options.map((option, i) => (
            <Option key={i} option={option} />
          ))}
        </div>
        <div className='cost'>{cost}</div>
      </div>
    </div>
  );
};

export default StreamCard;
