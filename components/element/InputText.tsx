'use client';

import { TextInput, Text } from '@tremor/react';

export const InputText = ({
  label,
  placeholder,
  isError,
  errorMessage,
  isDisabled
}: {
  label: string;
  placeholder: string;
  isError: boolean;
  errorMessage: string;
  isDisabled: boolean;
}) => {
  return (
    <div className="mt-2 mb-2">
      <Text className="mb-2">{label}</Text>
      <TextInput
        placeholder={placeholder}
        error={isError}
        errorMessage={errorMessage}
        disabled={isDisabled}
      />
    </div>
  );
};
