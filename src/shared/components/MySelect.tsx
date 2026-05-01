import React from 'react';
import { Option } from '../../features/todo/model/types';
interface MySelectProps {
  options: Option[];
  defaultValue: string;
  value: string | number;
  onChange: (value: string | number) => void;
}
export const MySelect: React.FC<MySelectProps> = ({
  options,
  defaultValue,
  value,
  onChange
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
