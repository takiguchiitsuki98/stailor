'use client'
import { Button } from '@tremor/react';
import React from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export const RegisterDailyReportButton = ({
    buttonLabel,
}: {
    buttonLabel: string;
}) => {
    return (
        <Button
            icon={DocumentTextIcon}
        >
            {buttonLabel}
        </Button>
    )
};
