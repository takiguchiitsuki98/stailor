'use client';

import { Text } from '@tremor/react';

export const SelectDate = ({
  label,
  placeholder,
  isDisabled
}: {
  label: string;
  placeholder: string;
  isDisabled: boolean;
}) => {
  return (
    <div className="mt-2 mb-2">
      <Text className="mb-2">{label}</Text>
      <div className="relative max-w-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          datepicker
          type="text"
          className="w-full pl-10 p-2.5 text-sm rounded-tremor-default transition duration-100 text-tremor-default shadow-tremor-input focus:ring-2 focus:border-tremor-brand-subtle border-tremor-border focus:ring-tremor-brand-muted block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};
