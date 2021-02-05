import React, { ChangeEvent, useState } from 'react';
import { Button, Input, Radio, RadioChangeEvent } from 'antd';
import FilterByName from './FilterByName';
import FilterByType from './FilterByType';

function FilterWrapper() {
  const [filterType, setFilterType] = useState<string>('byName');
  const onRadioChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setFilterType(e.target.value);
  };
  return (
    <div>
      <Radio.Group
        defaultValue='byName'
        buttonStyle='solid'
        onChange={onRadioChange}
      >
        <Radio.Button value='byName'>Name</Radio.Button>
        <Radio.Button value='byType'>Type</Radio.Button>
      </Radio.Group>

      {filterType === 'byName' && <FilterByName />}
      {filterType === 'byType' && <FilterByType />}
    </div>
  );
}

export default FilterWrapper;
