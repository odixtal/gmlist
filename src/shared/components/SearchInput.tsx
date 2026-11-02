import type { ChangeEvent } from 'react';

interface SearchInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="search-input"
        />
    );
}