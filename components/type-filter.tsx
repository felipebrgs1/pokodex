'use client';

import { useState } from 'react';

interface TypeFilterProps {
    types: string[];
    onTypeChange: (type: string) => void;
}

export function TypeFilter({ types, onTypeChange }: TypeFilterProps) {
    const [selectedType, setSelectedType] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedType(value);
        onTypeChange(value);
    };

    return (
        <select
            value={selectedType}
            onChange={handleChange}
            className='w-full px-4 py-3 rounded-lg bg-white border-0 shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700'
        >
            <option value=''>Todos os tipos</option>
            {types.map((type) => (
                <option
                    key={type}
                    value={type}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
            ))}
        </select>
    );
}
