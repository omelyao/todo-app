import React from 'react';
import { Option } from '../model/types';

interface PageLimitSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const PageLimitSelector: React.FC<PageLimitSelectorProps> = ({
  value,
  onChange
}) => {
  return (
    <select
      value={value}
      onChange={e => {
        const newValue =
          typeof e.target.value === 'string'
            ? Number(e.target.value)
            : e.target.value;
        onChange(newValue);
      }}
    >
      <option disabled value="">
        Кол-во элементов на странице
      </option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={-1}>Показать все</option>
    </select>
  );
};
