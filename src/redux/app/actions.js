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

export const getEmployees = () => ({
  type: GET_EMPLOYEES_LIST,
});
export const getEmployeesSuccess = (employees) => ({
  type: GET_EMPLOYEES_LIST_SUCCESS,
  payload: employees,
});

export const getProducts = (productInfos) => ({
  type: GET_PRODUCTS,
  payload: productInfos,
});
export const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProductsError = (error) => ({
  type: GET_PRODUCTS_ERROR,
  payload: error,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  payload: product,
});

export const addQuantity = (product) => ({
  type: ADD_QUANTITY,
  payload: product,
});

export const subQuantity = (product) => ({
  type: SUB_QUANTITY,
  payload: product,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});
