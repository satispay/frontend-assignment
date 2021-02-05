import React from 'react';
import { Select } from 'antd';
import { pokeTypes } from '../constants/index';

const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

function FilterType() {
  return (
    <>
      <Select defaultValue='All' style={{ width: 120 }} onChange={handleChange}>
        {pokeTypes.map((pokeType) => (
          <Option value={pokeType}>{pokeType}</Option>
        ))}
      </Select>
    </>
  );
}

export default FilterType;
