import React, {useState, useEffect} from 'react';
import $ from 'jquery';
import { AiOutlineClose } from 'react-icons/ai';
import Alert from 'react-bootstrap/Alert';


const EditUser = (props) => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, [props.field]);

  const close = () => {
    $('#update-box').addClass('hide');
    $('#account').removeClass('hide');
  }

  const updateUser = (e) => {
    e.preventDefault();
    if (props.field, e.target[0].value) {
      setSubmitted(true);
      console.log(e.target[0].value);
      props.update(props.field, e.target[0].value);
      e.target[0].value = '';
      setTimeout(() => setSubmitted(false), 1200);
    }
  }

  return (
    <div className='hide' id='update-box'>
      <form className='update-form' onSubmit={(e) => updateUser(e)}>
        <div className='alert-container'>
        {
          submitted ?
           <Alert className='alert'>{props.field} has been changed</Alert>:
           null
        }
        </div>
        <span onClick={() => close()}><AiOutlineClose id='update-close'/></span>
        <span class='form-bottom'>
          <label htmlFor={props.field} className='update-label'>Enter Updated {props.field}</label>
          <input id={props.field} type='text' className='update-input' />
          <input type='submit' id='update-btn' value='Submit' />
        </span>
      </form>
    </div>
  )
}

export default EditUser;