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
