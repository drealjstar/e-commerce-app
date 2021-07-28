import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './full_info.css';

class FullInfo extends Component{
state = {
quantity : 1

}

decrementQuantity = () =>{
  if(this.state.quantity < 1){
      this.setState({
        quantity : 1
      });
    }else{
    this.setState({
      quantity : this.state.quantity - 1,
    });
  }
  }

  incrementQuantity = () =>{
    this.setState({
      quantity : this.state.quantity + 1,
    })
  }

   render(){

    const {location, addToCart} = this.props;
    const {productData} = location;
    const {quantity}= this.state;
   
    return(
     <div className= 'full_info'>
       <Link to="/" className='back'>
       <p className='back_text'>Back</p>
      </Link>
      {productData ? (
      <div className= 'info_card'>
      <img src={productData.image}  alt= "no"  className= 'info_img'/>

      <div className= 'info'>
      <p className='info_title'>{productData.title}</p>
      <h1 className='info_price'>{productData.price}</h1>
           
      <div className= 'quantities-button'>
      <button className= 'decrease-button'  onClick={this.decrementQuantity}>−</button>
      <button className='quantity-button'>{this.state.quantity}</button>
      <button className= 'increase-button' onClick={this.incrementQuantity}>+</button>
      </div>
      <button className= 'info_button' onClick={()=> addToCart({...productData, quantity})}>ADD TO CART</button>
      </div>
      </div> 
        ) : <p className= 'no-data'> no data available </p>}
      </div>
     );
   }
 }

export default FullInfo;