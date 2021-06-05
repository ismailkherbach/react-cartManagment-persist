import {
  GET_EMPLOYEES_LIST,
  GET_EMPLOYEES_LIST_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  CLEAR_CART,
} from "../actions";

const INIT_STATE = {
  error: "",
  loading: false,
  employees: [],
  products: [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_LIST:
      return { ...state, loading: true, error: "" };
    case GET_EMPLOYEES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        employees: action.payload,
      };

    case GET_PRODUCTS:
      return { ...state, loading: true, error: "" };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        products: action.payload,
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: [],
      };

    case ADD_TO_CART:
      let addedProduct = action.payload;
      let existed_item = state.cartItems.find(
        (item) => action.payload.id === item.id
      );
      if (existed_item) {
        let objIndex = state.cartItems.findIndex(
          (product) => product.id === addedProduct.id
        );

        state.cartItems[objIndex].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        let newTotal = state.total + 10;
        localStorage.setItem("total", JSON.stringify(newTotal));

        return {
          ...state,
          total: state.total + 10,
        };
      } else {
        addedProduct.quantity = 1;
        let newTotal = state.total + 10;
        localStorage.setItem("total", JSON.stringify(newTotal));

        let cart = [...state.cartItems, action.payload];
        localStorage.setItem("cart", JSON.stringify(cart));
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],

          total: newTotal,
        };
      }

    case REMOVE_FROM_CART:
      let productToRemove = action.payload;
      let newProducts = state.cartItems.filter(
        (item) => action.payload.id !== item.id
      );
      if (state.cartItems.length < 1) {
        localStorage.removeItem("cart");
        localStorage.removeItem("total");
      } else {
        localStorage.setItem("cart", JSON.stringify(newProducts));
      }

      let newTotal = state.total - 10 * productToRemove.quantity;
      localStorage.setItem("total", JSON.stringify(newTotal));

      return {
        ...state,
        cartItems: newProducts,
        total: newTotal,
      };
    case ADD_QUANTITY:
      let productToAddQunt = action.payload;
      let objIndex = state.cartItems.findIndex(
        (product) => product.id === productToAddQunt.id
      );

      state.cartItems[objIndex].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      let addedTotal = state.total + 10;
      localStorage.setItem("total", JSON.stringify(addedTotal));

      return {
        ...state,
        total: addedTotal,
      };

    case SUB_QUANTITY:
      let productToSubQunt = action.payload;
      if (productToSubQunt.quantity === 1) {
        let new_items = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        localStorage.setItem("cart", JSON.stringify(new_items));

        let subbedTotal = state.total - 10;
        localStorage.setItem("total", JSON.stringify(subbedTotal));

        return {
          ...state,
          cartItems: new_items,
          total: subbedTotal,
        };
      } else {
        let objIndex = state.cartItems.findIndex(
          (product) => product.id === productToSubQunt.id
        );

        state.cartItems[objIndex].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
        let subbedTotal = state.total - 10;
        localStorage.setItem("total", JSON.stringify(subbedTotal));

        return {
          ...state,
          total: subbedTotal,
        };
      }
    case CLEAR_CART:
      localStorage.removeItem("cart");
      localStorage.removeItem("total");

      return {
        ...state,
        cartItems: [],
        total: 0,
      };

    default:
      return { ...state };
  }
};
