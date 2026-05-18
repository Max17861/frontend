export const apiConfig = {
  //goods: "https://fakestoreapi.com/products/",
  goods: "http://127.0.0.1:8000/api/products/",
  imageBaseUrl: "https://fakestoreapi.com/products/image/",
  categoryList: "https://fakestoreapi.com/products/categories",
};

export const fetchGoods = async () => {
  try {
    const res = await fetch(apiConfig.goods);
    if (!res.ok) {
      throw new Error(`${res.status}. Something went wrong`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(apiConfig.categoryList);
    if (!res.ok) {
      throw new Error(`${res.status}. Something went wrong`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const res = await fetch(`${apiConfig.goods}?category=${category}`);
    if (!res.ok) {
      throw new Error(`${res.status}. Could not fetch category products`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Registration part
export const registerUser = async (username, password) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Detailed error in registerUser:", error.message);
    throw error; // Pass it up to the React component
  }
};

export const loginUser = async (username, password) => {
  const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
};

export const logoutUser = async (token) => {
  await fetch("http://127.0.0.1:8000/api/auth/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const fetchDbCart = async (token) => {
  const res = await fetch("http://127.0.0.1:8000/api/cart/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Token ${token}` }),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart data.");
  }

  return await res.json();
};

export const addToDbCart = async (productId, token) => {
  const res = await fetch("http://127.0.0.1:8000/api/cart/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: productId }),
  });
  return await res.json();
};

export const checkoutDbCart = async (token) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/cart/", {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Checkout failed");
    return await res.json();
  } catch (error) {
    console.error("Error during checkout:", error);
    return null;
  }
};
