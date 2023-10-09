'use client';

import { Text } from '@tremor/react';

export const Textarea = ({
  elementId,
  label,
  error,
  errorMessage,
  placeholder,
  isDisabled
}: {
  elementId: string;
  label: string;
  error: boolean;
  errorMessage: string;
  placeholder: string;
  isDisabled: boolean;
}) => {
  return (
    <div className="mt-2 mb-2">
      <Text className="mb-2">{label}</Text>
      <textarea
        id={elementId}
        rows={4}
        className="w-full outline-none text-left whitespace-nowrap truncate rounded-tremor-default focus:ring-2 transition duration-100 text-tremor-default shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted pl-4 pr-8 py-2 border placeholder:text-tremor-content dark:placeholder:text-tremor-content bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis border-tremor-border dark:border-dark-tremor-border"
        placeholder={placeholder}
        disabled={isDisabled}
      ></textarea>
    </div>
  );
};
