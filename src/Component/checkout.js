import React, {Component} from "react";
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from "react-toasts";
import StripeCheckout from "react-stripe-checkout";
import './checkout.css';
import {Link} from 'react-router-dom';
import {getTotal} from './add';
import userContext from '../Context/userContext';


class Checkout extends Component {
    constructor(prop){
       super(prop);
        this.thanks = this.thanks.bind(this);
   }
   thanks(token){
     console.log(token)
     return ToastsStore.success('Payment was successful')
   }
  
    render() {
      
      return(
        <userContext.Consumer>
        {props =>{
     
         const {cart}= props.userDetails;
     
         const total= getTotal(cart);
     
        return (
          <div className='paymentBox'>
           <Link to="/total_amount" className='back'>
           <p className='back_text3'>Back</p>
           </Link>
           
           <div className='stripePayment'>
                <h2 className='heading'>Make your payment with <span>stripe</span> </h2>
                <StripeCheckout
                 stripeKey="pk_test_51JB0aTHScwpLZvovonxaYlv150xIhFAgXVe8YFLOKBwjs4H3LRdqIg9TCt5jP6eVpt4Cl4bwRWUsvIwzZ2rB2nrz00PBFJHXk5"
                 name='Payment of item'
                 description='BUYTIME PRODUCT'
                 amount= {total * 100}
                 token={this.thanks}
                 currency='USD'
                 />
                 <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
              </div>
              <div className='image'>
              </div>
            </div>
        )
    }
}
</userContext.Consumer>
   );
  }
}


export default Checkout;


