import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userContext from '../Context/userContext';
import { reduceLength } from './reducelength';
import "./home.css";

class Home extends Component {

  render() {

    return (
      <userContext.Consumer>
        {props => {
          const { details } = props.userDetails;
          return (
            <div className='home'>
              <div className='card_cover'>

                {details.map((detail, i) => {
                  return (
                    <Link to={{ pathname: '/full_info', productData: detail }} className='LinkTo_fullInfo'>
                      <div className='card_group' key={i}>
                        <img src={detail.image} alt="no" />
                        <p className='title'>{reduceLength(detail.title, 45)}</p>
                        <h1 className='price'>{detail.price}</h1>
                      </div>
                    </Link>
                  );

                })}

              </div>
            </div>
          )
        }}
      </userContext.Consumer>
    );
  }
}

export default Home;