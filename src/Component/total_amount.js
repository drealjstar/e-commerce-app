import React, { Component } from 'react';
import { reduceLength } from './reducelength';
import { reduceTotalLength } from './reducetotallength';
import userContext from '../Context/userContext';
import { Link } from 'react-router-dom';
import './total_amount.css';
import { getTotal } from './add';


class Total extends Component {

  render() {

    return (
      <userContext.Consumer>
        {props => {

          const { cart } = props.userDetails;
          const total = getTotal(cart);
          const { deleteFromCart, clearCart } = this.props

          return (
            <div className='total_amt'>
              <Link to="/" className='back'>
                <p className='back_text2'>Back</p>
              </Link>

              {cart.map((prod, i) => {
                return (
                  <div className='items' key={i}>
                    <div className='items_head'>
                      <h3 className='cart_title' style={{ color: "black" }}>{reduceLength(prod.title, 20)}</h3>
                      <div className='otherhead_wrapper'>
                        <p className='price_name'>Price</p>
                        <p className='qty_name'>Qty</p>
                        <p className='subtotal_name'>Total</p>

                        <delete className='cart_delete'
                          onClick={() => {
                            deleteFromCart(prod.id);
                          }}
                        >×</delete>
                      </div>
                    </div>
                    <div className='items_cost'>
                      <img src={prod.image} alt='no' className='cart_total_img' />
                      <div className='othercost_wrapper'>
                        <p className='cart_price'>{prod.price}</p>
                        <p className='cart_quantity'>{prod.quantity}</p>
                        <p className='cart_subtotal'>{(prod.price) * (prod.quantity)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {cart.length > 0 ?
                <div className="total">
                  <Link to='/checkout' className='paymentBtn'> <button className='check_button'><span>Checkout </span></button> </Link>
                  <button className='clear_cart' onClick={clearCart}>Clear Cart</button>
                  <h1 className='cart_total'>Grand Total :   {reduceTotalLength(String(total), 6)}</h1>

                </div> : <h2 className='alt_to_data'> No Data</h2>
              }
            </div>
          )
        }
        }
      </userContext.Consumer>
    );
  }
}


export default Total;