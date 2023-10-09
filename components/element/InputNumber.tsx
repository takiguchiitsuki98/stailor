import React from 'react'
import { TextInput, Text } from '@tremor/react';


export const InputNumber = () => {
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
    )
}
