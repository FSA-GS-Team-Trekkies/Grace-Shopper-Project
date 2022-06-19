import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, removeItem, updateCart } from '../store/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      totalPrice: 0,
    };
    this.changeQuantity = this.changeQuantity.bind(this);
  }

  componentDidMount() {
    this.props.getCart();
  }

  changeQuantity(evt) {
    this.setState({ productId: evt.target.id });
    this.props.updateCart(evt.target.value, evt.target.id);
  }

  render() {
    const { cart, removeItemFromCart } = this.props;
    const { cart_details } = cart;
    const total = {};
    if (cart_details) {
      const copyDetails = [...cart_details];

      const totalPrice = copyDetails.reduce((acc, item) => {
        return (acc +=
          parseInt(item.product_quantity, 10) *
          parseInt(item.product.price, 10));
      }, 0);

      total['totalPrice'] = totalPrice;
    }
    console.log('total ', total);

    return (
      <div>
        <h1>Shopping Cart</h1>
        <Link to="/checkout">
          <button>Proceed to Checkout </button>
        </Link>
        <hr></hr>
        <div
          id="entire-cart-container"
          style={{
            padding: '1rem',
            border: '1px solid black',
            margin: '1rem',
            width: '90%',
            display: 'flex',
            flexDirection: 'row',
            alignSelf: 'center',
          }}
        >
          <div
            id="column-balanced-against-cartTotal"
            style={{
              width: '50%',
              height: '100%',
              alignSelf: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {cart_details === undefined
              ? 'Cart Empty'
              : cart_details.length === 0
              ? 'Cart Empty'
              : cart_details.map((item) => (
                  <div
                    id="cartdetail-item-container"
                    style={{
                      padding: '1rem',
                      border: '1px solid black',
                      margin: '1rem',
                      width: '80%',
                      height: '40%',
                    }}
                    key={item.id}
                  >
                    <div
                      id="button-and-image-container"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}
                    >
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          alignSelf: 'flex-start',
                        }}
                        src={item.product.image_url}
                      ></img>
                      <button
                        style={{
                          zIndex: 1,
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => removeItemFromCart(item.product.id)}
                      >
                        ❌
                      </button>
                    </div>
                    <div style={{}}>
                      <li>Product Name: {item.product.name}</li>
                      <li>Price: ${item.product.price}</li>
                      <li>Quanity: {item.product_quantity}</li>
                    </div>
                    <select
                      style={{ width: '30%' }}
                      name="quanity"
                      id={item.product.id}
                      onChange={this.changeQuantity}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                ))}
          </div>
          <div
            id="cart-total-container"
            style={{
              border: '1px solid black',
              width: '50%',
              height: '800px',
              alignSelf: 'flex-start',
              fontSize: '35px',
            }}
          >
            <h3>TOTAL COST BEFORE TAX:</h3>
            <h5>$ {total.totalPrice}</h5>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ cart: state.cart, user: state.auth });
const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(fetchCart()),
  removeItemFromCart: (productId) => dispatch(removeItem(productId)),
  updateCart: (productId, productQuantity) =>
    dispatch(updateCart(productId, productQuantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
