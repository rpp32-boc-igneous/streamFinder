import React from 'react';
import $ from 'jquery';
import { AiOutlineClose } from 'react-icons/ai';

const EditUser = (props) => {
  const close = () => {
    $('#update-box').addClass('hide');
    $('#account').removeClass('hide');
  }

  const updateUser = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    props.update(props.field, e.target[0].value);
    e.target[0].value = '';
  }

  return (
    <div className='hide' id='update-box'>
      <form className='update-form' onSubmit={(e) => updateUser(e)}>
      <span onClick={() => close()}><AiOutlineClose id='update-close'/></span>
        <label htmlFor={props.field} className='update-label'>Enter Updated {props.field}</label>
        <input id={props.field} type='text' className='update-input' />
        <input type='submit' id='update-btn' value='Submit' />
      </form>
    </div>
  )
}

export default EditUser;