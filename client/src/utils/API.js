// Get logged in user's info (requires token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

// Register a new user
export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// Log in a user
export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// Save a fashion item for a logged in user
export const saveFashionItem = (itemData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(itemData),
  });
};

// Remove a saved fashion item for a logged in user
export const deleteFashionItem = (itemId, token) => {
  return fetch(`/api/users/fashion/${itemId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// Search for fashion items using fakestoreapi.com
export const searchFashionItems = (query) => {
  // Fetch all products and filter by query in JS.
  // You can replace this with a real search endpoint if available.
  return fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(items =>
      items.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    );
};