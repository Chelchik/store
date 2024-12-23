export function filterReducer(state = productsFiltarInitialState, action) {
  let updatedState;

  switch (action.type) {
    case "SetProducts":
      updatedState = {
        ...state,
        allProducts: action.payload,
        products: action.payload,
      };
      localStorage.setItem(
        "allProducts",
        JSON.stringify(updatedState.allProducts)
      );
      return updatedState;

    case "Filter":
      return {
        ...state,
        products: state.allProducts.filter((product) =>
          action.liked.includes(product.id)
        ),
      };

    case "ShowAll":
      return { ...state, products: state.allProducts };

      case "Delete":
        updatedState = {
          ...state,
          products: state.products.filter(
            (product) => product.id !== action.payload
          ),
          allProducts: state.allProducts.filter(
            (product) => product.id !== action.payload
          ),
          removedProducts: [
            ...state.removedProducts,
            state.allProducts.find((product) => product.id === action.payload),
          ],
        };
        localStorage.setItem(
          "removedProducts",
          JSON.stringify(updatedState.removedProducts)
        );
        localStorage.setItem(
          "allProducts",
          JSON.stringify(updatedState.allProducts)
        );
        return updatedState;      

    case "Restore":
      const restoredProducts = [...state.removedProducts];
      const updatedProducts = [...state.products, ...restoredProducts];
      const updatedAllProducts = [...state.allProducts, ...restoredProducts];

      localStorage.removeItem("removedProducts");
      localStorage.setItem("allProducts", JSON.stringify(updatedAllProducts));

      return {
        ...state,
        products: updatedProducts,
        allProducts: updatedAllProducts,
        removedProducts: [],
      };

    default:
      return state;
  }
}

export const productsFiltarInitialState = {
  allProducts: [],
  products: [],
  removedProducts: [],
};

export function selectFilter(state) {
  return state.filter.products;
}
