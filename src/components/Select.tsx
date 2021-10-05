import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';

interface SelectProps {
  handleChange: (e: any) => void;
  options: string[];
  name?: string
}

const SelectComp: React.FC<SelectProps> = ({ handleChange, options, name }: SelectProps) => {
  const [value, setValue] = useState<unknown>('');

  const renderOptions = () => {
    const menuItems = options.map((option) => (
      <MenuItem key={option} title={option} value={option}>
        {option}
      </MenuItem>
    ));
    return menuItems;
  };
  return (
    <Select
      placeholder="Select One"
      value={value}
      name={name}
      onChange={(e) => {
        setValue(e.target.value);
        handleChange(e);
      }}
    >
      {options ? renderOptions() : null}
    </Select>
  );
};

export default SelectComp;
