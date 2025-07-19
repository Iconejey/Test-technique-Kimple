import { useState, useEffect } from 'react';
import { API_KEY, API_SECRET, API_BASE_URL } from '../../constants.js';

// Custom hook to fetch data from a given URL
// I found out that the TanStack Query library is a great alternative, but I want to become more familiar with "native" React first :
// https://tanstack.com/query/latest/docs/framework/react/overview
export function useFetch(url, options = {}) {
	// States to manage data, loading state, and errors
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Async function to fetch data
	const fetchData = async (fetch_url, fetch_options) => {
		try {
			// Loading state
			setLoading(true);
			setError(null);

			// Fetching data
			const response = await fetch(fetch_url, {
				...fetch_options,
				headers: {
					'Content-Type': 'application/json',
					...fetch_options.headers
				}
			});

			// Throw an error if the response is not ok
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);

			// Parse the response data
			const result = await response.json();

			// Set the fetched data
			setData(result);
		} catch (err) {
			// Ignore AbortError
			if (err.name !== 'AbortError') setError(err.message);

			throw err;
		}

		// Set loading to false after fetching data
		setLoading(false);
	};

	// Effect to fetch data on mount
	useEffect(() => {
		if (!url) return;

		// AbortController to cancel the fetch request if the component unmounts
		const controller = new AbortController();

		// Fetch data with the provided URL and options
		fetchData(url, {
			...options,
			signal: controller.signal
		});

		// Cleanup function to abort the fetch request if the component unmounts
		return () => controller.abort();
	}, [url]);

	// Function to refetch data with new URL or options
	const refetch = (newUrl, new_options) => fetchData(newUrl || url, new_options || options);

	return {
		data,
		loading,
		error,
		refetch
	};
}

// Custom hook to fetch data from Kimple API
export function useKimpleAPI(endpoint, options = {}) {
	// Construct the full URL
	const url = `${API_BASE_URL}${endpoint}`;

	// Options to include API key and secret
	const kimple_options = {
		...options,
		headers: {
			'Api-Key': API_KEY,
			'Api-Secret': API_SECRET,
			...options.headers
		}
	};

	// Use the useFetch hook
	return useFetch(url, kimple_options);
}

// Custom hook to fetch the list of contests
export function useContestsList(state) {
	// Default URL parameters
	const url_params = { order: 'start_at desc' };

	// Construct the search parameter
	const search_params = [];
	if (state) search_params.push(`state='${state}'`);
	const search_query = search_params.join('&&');
	if (search_query) url_params.search = search_query;

	const query_string = new URLSearchParams(url_params).toString();
	const endpoint = `/contests/list?${query_string}`;

	// Use the useKimpleAPI hook to fetch the contests
	return useKimpleAPI(endpoint);
}
