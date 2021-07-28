import React from "react";
import Home from "./Component/home";
import FullInfo from "./Component/full_info";
import Total from "./Component/total_amount";
import "./App.css";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import userContext from './Context/userContext';
import { Link } from 'react-router-dom';
import Axios from "axios";
import Checkout from './Component/checkout';


class App extends React.Component {
  state = {
    details: [],
    cart: [],
    searchText: "",
    loading: false,
    };

  searchHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const newDetails = this.state.details.filter(data => data.title.toLowerCase().includes(this.state.searchText.toLowerCase()))
   
    this.setState({ loading: false, details: newDetails });

  }

  componentDidMount() {
    Axios.get('https://fakestoreapi.com/products').then((result) => {
      this.setState({ details: result.data });
    });
  };

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  addToCart = (product) => {
    const productInCart = this.state.cart.find(c => c.id === product.id );

    if(productInCart){
      productInCart.quantity =  productInCart.quantity + product.quantity;

      console.log(productInCart,'inside',this.state.cart )
        const newState = this.state.cart.map(c => {
          if(c.id === productInCart){
            c = productInCart
          }
          return c
        })
      this.setState({
        cart: newState
      });
    }else{
      this.setState({
        cart: [...this.state.cart, product]
      });
    }
    
  }

  deleteFromCart = (id) => {
    const deletingCart = this.state.cart.filter(details => {
      
      return details.productData.id !== id
    })
    this.setState({
      cart : deletingCart
    })
  }

   clearCart = () => {
     this.setState({
     cart : []
   });
  }

 render() {
    const { cart} = this.state;
    console.log(this.state.cart, '-------')
    const cartLength = cart.map(i => i.quantity).reduce((a, b) => a + b, 0);

    return (
      <BrowserRouter>
        <userContext.Provider value={
          { userDetails: this.state }
        }>

          <div className='App'>

            <div className='header'>
              <h1 className='company_name'>Buytime</h1>
              <div className='other_header_info'>
                <button className='search_button' onClick={this.searchHandler}>Search</button>
                <input className='search' onChange={this.handleChange} />
                <h3 className='user_details'>Login/ Signup</h3>

                <div className='cart'>
                  <Link to="/total_amount" className='total_page'>
                    <div className='cart_info'>

                      <link href='https://css.gg/shopping-cart.css' rel='stylesheet'></link>
                      <i className="gg-shopping-cart"></i>

                      <p className='cart_title' >Cart</p>
                      <span className='cart_number'>{cartLength}</span>
                      
                      </div>
                  </Link>
                </div>
              </div>
            </div>

            <Switch>

              <Route exact path='/' render={(props) => <Home   {...props} />} />

              <Route exact path='/full_info' render={(props) => <FullInfo   {...props} addToCart={this.addToCart} />} />

              <Route exact path='/total_amount' render={(props) => <Total {...props}  deleteFromCart={this.deleteFromCart}  clearCart={this.clearCart}/>} />

              <Route exact path='/checkout' render={(props) => <Checkout {...props} />} />
            </Switch>
          </div>
        </userContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;

