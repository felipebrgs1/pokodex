'use client';

import { useState } from 'react';

interface SearchBarProps {
    onSearchChange: (value: string) => void;
    placeholder?: string;
}

export function SearchBar({
    onSearchChange,
    placeholder = 'Buscar por nome ou número...',
}: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    return (
        <input
            type='text'
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleChange}
            className='w-full px-4 py-3 rounded-lg border-0 shadow-lg bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none text-gray-700'
        />
    );
}
