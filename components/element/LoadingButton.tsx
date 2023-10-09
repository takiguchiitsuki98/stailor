'use client';
import { Button, ButtonVariant } from '@tremor/react';

export const LoadingButton = ({
  size,
  label,
  variant,
  disabled,
  loading
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  label: string;
  variant?: ButtonVariant | undefined;
  disabled?: boolean;
  loading?: boolean;
}) => {
  return (
    <div>
      <Button
        size={size}
        variant={variant}
        disabled={disabled}
        loading={loading}
        className="w-full"
      >
        {label}
      </Button>
    </div>
  );
};
