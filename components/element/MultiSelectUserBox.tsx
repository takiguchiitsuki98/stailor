'use client';

import React from 'react';
import { MultiSelect, MultiSelectItem, Text } from '@tremor/react';

export const MultiSelectUserBox = ({
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
      <MultiSelect placeholder={placeholder}>
        {listItems?.map((item) => (
          <MultiSelectItem value={String(item.code)}>
            {String(item.id)} : {item.username}
          </MultiSelectItem>
        ))}
      </MultiSelect>
    </div>
  );
};
