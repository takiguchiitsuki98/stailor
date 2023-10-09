'use client';

import React from 'react';
import { SearchSelect, SearchSelectItem, Text } from '@tremor/react';

export const SelectSearchCode = ({
  label,
  listItems,
  placeholder
}: {
  label: string;
  listItems: Array<any>;
  placeholder: string;
}) => {
  return (
    <div className="mt-2 mb-2">
      <Text className="mb-2">{label}</Text>
      <SearchSelect placeholder={placeholder}>
        {listItems?.map((item) => (
          <SearchSelectItem value={String(item.code)}>
            {String(item.code)} : {item.name}
          </SearchSelectItem>
        ))}
      </SearchSelect>
    </div>
  );
};
