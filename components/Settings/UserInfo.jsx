import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { IoPencil } from 'react-icons/io5';

const UserInfo = (props) => {
  const openEdit = (field) => {
    $('#update-box').removeClass('hide');
    $('#account').addClass('hide');
    props.setField(field);
  }

  return (
    <div>
      <table>
        <tbody id='user-table'>
          <tr>
            <td className='table-field' id='email-label'>Email: </td>
            <td className='table-input' id='email'>{props.email}</td>
            <td>
              <IoPencil className='icon edit-account'
              onClick={() => openEdit('Email')}
              />
            </td>
          </tr>
          <tr>
            <td className='table-field' id='password-label'>Password: </td>
            <td className='table-input' id='password'>{props.password}</td>
            <td>
              <IoPencil className='icon edit-account'
              onClick={() => openEdit('Password')}
              />
             </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
