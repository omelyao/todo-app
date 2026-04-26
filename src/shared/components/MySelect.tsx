import React from 'react';
import { MySelectProps } from '../../features/todo/model/types';

export const MySelect: React.FC<MySelectProps> = ({
  options,
  defaultValue,
  value,
  onChange,
}) => {
  return (
    <select value={value} onChange={event => onChange(event.target.value)}>
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
