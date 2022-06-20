/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import axios from "axios";

// Action Types
const GET_CART = "GET_CART";
const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
const CHECKOUT_CART = "CHECKOUT_CART";

// Action Creators
const setCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

const _removeItem = (cart) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    cart,
  };
};

const _checkoutCart = (cart) => {
  return {
    type: CHECKOUT_CART,
    cart,
  };
};

// Thunk Creators

//GET SINGLE CART
export const fetchCart = (userId) => async (dispatch) => {
  try {
    // logic for if customer is a guest & not logged in...
    if (!userId) {
      window.localStorage.cart
        ? dispatch(setCart(JSON.parse(window.localStorage.getItem("cart"))))
        : window.localStorage.setItem(
            "cart",
            JSON.stringify({ cart_details: [] })
          );
      dispatch(setCart(JSON.parse(window.localStorage.getItem("cart"))));
    } else {
      // original logic for if customer is logged in to fest & set cart...
      const { data: cart } = await axios.get("/api/carts/getCart");
      cart.cart_details.sort((a, b) => a.id - b.id);
      dispatch(setCart(cart));
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateCart = (quantity, productId) => async (dispatch) => {
  try {
    await axios.put(`/api/carts`, {
      productId,
      quantity,
    });
    dispatch(fetchCart());
  } catch (err) {
    console.error(err);
  }
};

//DELETE SINGLE CART (ALL QUANTITY)
export const removeItem = (productId) => {
  return async (dispatch) => {
    try {
      const data = await axios.delete(`/api/carts/${productId}`);

      dispatch(_removeItem(data));
    } catch (err) {
      console.error(err);
    }
  };
};

// CHECKOUT CART
export const checkoutCart = (orderTotal) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/orders", orderTotal);
      dispatch(_checkoutCart(data));
    } catch (err) {
      console.error(err);
    }
  };
};

/*
 *Reducer
 **/
export default function (state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case REMOVE_ITEM_FROM_CART:
      const actionProduct = action.cart.data.find((product) => product);
      const cart_details = state.cart_details.filter(
        (product) => product.id !== actionProduct.id
      );
      return { ...state, cart_details };
    case CHECKOUT_CART:
      return action.cart;
    default:
      return state;
  }
}
