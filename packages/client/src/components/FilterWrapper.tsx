import React, { useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import FilterByName from './FilterByName';
import FilterByType from './FilterByType';

function FilterWrapper() {
  const [filterType, setFilterType] = useState<string>('byName');
  const onRadioChange = (event: RadioChangeEvent) => {
    setFilterType(event.target.value);
  };
  return (
    <>
      <div style={{ paddingBottom: 20 }}>
        <Radio.Group
          defaultValue='byName'
          buttonStyle='solid'
          onChange={onRadioChange}
        >
          <Radio.Button value='byName'>Name</Radio.Button>
          <Radio.Button value='byType'>Type</Radio.Button>
        </Radio.Group>
      </div>
      {filterType === 'byName' && <FilterByName />}
      {filterType === 'byType' && <FilterByType />}
    </>
  );
}

export default FilterWrapper;
