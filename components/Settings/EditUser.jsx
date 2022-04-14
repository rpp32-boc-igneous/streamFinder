import React from 'react';
import $ from 'jquery';
import { AiOutlineClose } from 'react-icons/ai';

const EditUser = (props) => {
  const close = () => {
    $('#update-box').addClass('hide');
    $('#account').removeClass('hide');
  }

  return (
    <div className='hide' id='update-box'>
      <span onClick={() => close()}><AiOutlineClose className='close icon' id='update-close'/></span>
      <form className='update-form'>
        <label className='update-label'>Enter Updated {props.field}</label>
        <input className="update-input" type="text" />
        <button id='update-btn'> Submit </button>
      </form>
    </div>
  )
}

export default EditUser;