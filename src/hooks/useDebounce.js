import { useState, useEffect } from 'react';

// Custom hook that debounces a value
export function useDebounce(initial_value, delay) {
	const [value, setValue] = useState(initial_value);
	const [debounced_value, setDebouncedValue] = useState(initial_value);

	// Trigger the effect when value changes
	useEffect(() => {
		// Set a timeout to update the debounced value after the delay
		const handler = setTimeout(() => {
			console.log(`Debounced value updated to: ${value}`); // Debugging log
			setDebouncedValue(value);
		}, delay);

		// Cleanup function to clear the timeout if the component unmounts or value changes
		return () => clearTimeout(handler);
	}, [value, delay]);

	return [debounced_value, setValue];
}
