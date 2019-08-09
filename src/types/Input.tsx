import React from 'react';

export interface InputProps {
  label: string;
  text: string;
  type: string;
  id: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
