import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { pokeTypes } from '../constants/index';

function FilterType() {
  const menu = (
    <Menu>
      {pokeTypes.map((pokeType) => (
        <Menu.Item>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='http://www.alipay.com/'
          >
            {pokeType}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu}>
        <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
          Filter by Type <DownOutlined />
        </a>
      </Dropdown>
    </>
  );
}

export default FilterType;
