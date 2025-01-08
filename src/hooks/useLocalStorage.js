import { useState, useEffect } from 'react';

// Custom hook for local storage with expiration
function useLocalStorage(key, initialValue, expirationTime = null) {
    // Retrieve the initial value from local storage or use the provided initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            if (!item) return initialValue;

            const parsedItem = JSON.parse(item);
            
            // Check if the item has an expiration time and if it's still valid
            if (parsedItem?.expiration) {
                const now = new Date().getTime();
                if (now > parsedItem.expiration) {
                    localStorage.removeItem(key); // Remove expired item
                    return initialValue; // Return the initial value as fallback
                }
            }

            return parsedItem?.value ?? initialValue;
        } catch (error) {
            console.error(`Error reading local storage for key '${key}': ${error}`);
            return initialValue;
        }
    });

    // Update local storage whenever the value or expiration time changes
    useEffect(() => {
        try {
            const expiration = expirationTime ? new Date().getTime() + expirationTime : null;
            const valueToStore = { value: storedValue, expiration };
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error writing local storage for key '${key}': ${error}`);
        }
    }, [key, storedValue, expirationTime]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
