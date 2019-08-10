import React from 'react';
import './Input.scss';

export interface InputProps {
  label: string;
  text: string;
  type: string;
  id: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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
    <button>Click me</button>
  </div>
);
