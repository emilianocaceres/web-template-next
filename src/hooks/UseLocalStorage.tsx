'use client';

import { useEffect, useState } from 'react';

interface LocalStorageProps<T> {
    key: string;
    defaultValue: T;
}

export function useLocalStorage<T>({ key, defaultValue }: LocalStorageProps<T>) {
    const [value, setValue] = useState<T>(() => {
        if (typeof window !== 'undefined') {
            // Verifica que estamos en el entorno del navegador
            const storedValue = localStorage.getItem(key);

            return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;
        }

        return defaultValue;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Verifica que estamos en el entorno del navegador
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [value, key]);

    return [value, setValue] as const;
}
