# useApiRequest

A reusable and flexible React custom hook for making API requests. It supports multiple HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) and allows dynamic configuration of request parameters, headers, and body.

## Features
- **Dynamic HTTP Methods**: Support for `GET`, `POST`, `PUT`, and `DELETE`.
- **Error Handling**: Handles and exposes errors for better debugging.
- **Loading State**: Tracks the request's progress.
- **Refetch Capability**: Allows re-triggering the API request on demand.
- **Configurable**: Accepts dynamic parameters and headers.

## Installation
1. Install the required dependencies:

```bash
npm install axios
```

2. Add the `useApiRequest` hook to your project.

## Hook Usage

### Import the Hook
```javascript
import { useApiRequest } from './path-to-your-hook';
```

### Basic Example
Fetch data using a `GET` request:

```javascript
const { data, loading, error, makeRequest } = useApiRequest();

useEffect(() => {
  makeRequest('https://jsonplaceholder.typicode.com/posts');
}, []);
```

### Full Example with Multiple Methods

```javascript
import React, { useState } from 'react';
import { useApiRequest } from './path-to-your-hook';

const ApiExample = () => {
  const { data, loading, error, makeRequest } = useApiRequest();
  const [inputData, setInputData] = useState('');

  const handleGet = () => {
    makeRequest('https://jsonplaceholder.typicode.com/posts', { method: 'GET' });
  };

  const handlePost = () => {
    makeRequest('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      data: { title: inputData, body: 'This is a test post', userId: 1 },
    });
  };

  const handlePut = () => {
    makeRequest('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      data: { title: inputData, body: 'Updated content', userId: 1 },
    });
  };

  const handleDelete = () => {
    makeRequest('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE' });
  };

  return (
    <div>
      <h1>API Example</h1>
      <div>
        <button onClick={handleGet}>GET Posts</button>
        <button onClick={handlePost}>POST New Post</button>
        <button onClick={handlePut}>PUT Update Post</button>
        <button onClick={handleDelete}>DELETE Post</button>
      </div>
      <input
        type="text"
        placeholder="Input for POST/PUT"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default ApiExample;
```

## API Reference

### `useApiRequest`

#### Parameters
- **`initialUrl`** _(string)_: The default API endpoint (optional).
- **`initialOptions`** _(object)_: Axios configuration options (optional).

#### Returns
- **`data`** _(any)_: The response data from the API.
- **`loading`** _(boolean)_: Whether the request is in progress.
- **`error`** _(object | null)_: Any error that occurred during the request.
- **`makeRequest`** _(function)_: Function to make API requests dynamically.

#### `makeRequest(url: string, options: object)`
- **`url`** _(string)_: The API endpoint.
- **`options`** _(object)_: Axios configuration (e.g., method, headers, data).

## Examples

### Example 1: Fetch Posts
```javascript
const { data, loading, error } = useApiRequest('https://jsonplaceholder.typicode.com/posts');

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

return (
  <ul>
    {data.map((post) => (
      <li key={post.id}>{post.title}</li>
    ))}
  </ul>
);
```

### Example 2: Submit a Form
```javascript
const handleSubmit = () => {
  makeRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    data: { title: 'Test Title', body: 'Test Body', userId: 1 },
  });
};
```

### Example 3: Error Handling
```javascript
if (error) {
  console.error('Request failed:', error);
  alert('An error occurred: ' + error.message);
}
```

## License
MIT

