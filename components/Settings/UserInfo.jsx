import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { IoPencil } from 'react-icons/io5';

const UserInfo = (props) => {
  const openEdit = () => {
    $('#update-box').removeClass('hide');
    $('#account').addClass('hide');
  }

  return (
    <div>
      <table>
        <tr>
          <td className='table-field' id='email-label'>Email:</td>
          <td className='table-input' id='email'>john@gmail.com</td>
          <IoPencil className='edit-account'
          onClick={() => openEdit('email')}
          />
        </tr>
        <tr>
          <td className='table-field' id='password-label'>Password:</td>
          <td className='table-input' id='password'>*******</td>
          <IoPencil className='edit-account'
          onClick={() => openEdit('password')}
          />
        </tr>

      </table>
    </div>
  );
};

export default UserInfo;
