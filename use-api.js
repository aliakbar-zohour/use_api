import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * useApiRequest - A reusable custom hook for making API requests.
 *
 * @param {string} initialUrl - The default API endpoint.
 * @param {object} [initialOptions] - Default Axios configuration options.
 * @returns {object} - { data, loading, error, makeRequest }
 */

export const useApiRequest = (initialUrl = "", initialOptions = {}) => {
    const [data, setData] = useState(null); // State to store the API response data
    const [loading, setLoading] = useState(false); // State to track the loading status
    const [error, setError] = useState(null); // State to store any errors

    /**
     * makeRequest - Function to make API calls with dynamic methods and parameters.
     *
     * @param {string} url - API endpoint (overrides initialUrl if provided).
     * @param {object} options - Axios configuration options (e.g., method, headers, data).
     */

    const makeRequest = useCallback(async (url = initialUrl, options = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios({ url, ...initialOptions, ...options }); // Perform the API request
            setData(response.data); // Update the data state with the response
        } catch (err) {
            setError(err); // Capture any errors that occur during the request
        } finally {
            setLoading(false); // Set loading to false once the request is complete
        }
    }, [initialUrl, initialOptions]);

    return { data, loading, error, makeRequest };
};
