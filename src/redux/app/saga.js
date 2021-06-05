import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_PRODUCTS } from "../actions";
import axios from "axios";
import { getProductsError, getProductsSuccess } from "./actions";
import { API_URL, apiKey, productQuery } from "../../helpers/helpers";
const getProductsAsync = async (number, offset) =>
  axios({
    url: `${API_URL}products/search?query=${productQuery}&apiKey=${apiKey}&number=${number}&offet=${offset}`,
    method: "GET",
  });

function* getProducts({ payload }) {
  const { number, offset } = payload;
  try {
    const getResponse = yield call(getProductsAsync, number, offset);

    if (getResponse.status === 200) {
      yield put(getProductsSuccess(getResponse.data.products));
    } else {
      yield put(getProductsError("An error occured please try again"));
    }
  } catch (error) {
    yield put(getProductsError("An error occured please try again"));
  }
}

export function* watchGetProducts() {
  yield takeEvery(GET_PRODUCTS, getProducts);
}
export default function* rootSaga() {
  yield all([fork(watchGetProducts)]);
}
