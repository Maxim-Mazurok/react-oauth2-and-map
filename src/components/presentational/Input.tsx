import React from 'react';
import { InputProps } from '../types/Input';

export const Input = ({
  label,
  text,
  type,
  id,
  value,
  handleChange,
}: InputProps) => (
  <div className="form-group">
    <label htmlFor={label}>{text}</label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onChange={handleChange}
      required={true}
    />
  </div>
);
