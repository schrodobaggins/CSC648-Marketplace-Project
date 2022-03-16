import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/Modules/NavBar';
import Footer from '../components/Modules/Footer';
import { FaShoppingCart } from 'react-icons/fa';
import { connect, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  setProduct,
  addProductToCart,
  setPriceMatchingProducts,
  setAveragePrice,
  setMinPrice,
  setMaxPrice,
} from '../redux/actions/productActions';
import {
  setCartContents
} from '../redux/actions/shoppingCartActions';

const Product = (props) => {

    const dispatch = useDispatch(); 
    const { params } = props.match;

    useEffect(() => {
        axios.get(`/api/products/${params.id}`)
            .then((res) => {
                console.log(res);
                dispatch(setProduct(res.data));
                
                // Add this when a new product is created. Perform the web scraping once instead of everytime on page load...
                /*axios.get(`/api/price-matching/${res.data.title}`)
                    .then((res) => {
                        console.log(res);
                        dispatch(setAveragePrice(res.data.averagePrice));
                        dispatch(setMinPrice(res.data.minPrice));
                        dispatch(setMaxPrice(res.data.maxPrice));

                        axios.post(`/api/price-matching/${params.id}`, res.data)
                            .then((res) => {
                                console.log(res);

                                // perform dispatch here for populating 'setPriceMatchingProducts',
                                // that way we are loading redux state from data stored in our DB
                                dispatch(setPriceMatchingProducts(res.data.pm_products));
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });*/
                
                axios.get(`/api/price-matching/products/${params.id}`)
                    .then((res) => {
                        console.log(res);
                        dispatch(setAveragePrice(res.data.avgPrice));
                        dispatch(setMinPrice(res.data.minPrice));
                        dispatch(setMaxPrice(res.data.maxPrice));

                        // perform dispatch here for populating 'setPriceMatchingProducts',
                        // that way we are loading redux state from data stored in our DB
                        dispatch(setPriceMatchingProducts(res.data.pm_products));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`/api/cart/${props.user_id}`)
            .then((res) => {
                dispatch(setCartContents(res.data));
                console.log('cart contents:\n');
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addProductHandler = () => {
        dispatch(addProductToCart());
    };

    return (
        <div>
            <NavBar page={"Product"}/>
            <div className="individual-product-wrapper">
                <div className="individual-product-content">
                    <div className="individual-product-details">
                        <img 
                            src={`/uploads/${props.product.image}`}
                            className="individual-product-image" 
                            alt="Failed to load."
                        />
                        <div className="individual-product-additional-details">
                            <h4 className="individual-product-title">
                                {props.product.title}
                            </h4>
                            <h5 className="individual-product-description">
                                {props.product.description}
                            </h5>
                            <h5> Price: $<span> {props.product.price} </span> </h5>
                            <h5> Seller: <span> {props.product.creator} </span> </h5>
                            <div className="purchase-product-wrapper">
                              <Button variant="contained" color="primary" onClick={addProductHandler}>Add to Cart &nbsp; <FaShoppingCart /></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="price-matching-algorithm">
                    <h2> Price Matching </h2>
                    <div className="price-comparisons">
                        <span> The average price of products from Amazon are: {(props.avgPrice === '') ? "loading..." : `$ ${props.avgPrice}`} </span>
                        <span> The minimum price available is: {(props.minPrice === '') ? "loading..." : `$ ${props.minPrice}`} </span>
                        <span> The maximum price available is: $ {(props.maxPrice === '') ? "loading..." : `$ ${props.maxPrice}`} </span>
                    </div>
                    <ul className="price-matching-algorithm-ul">
                        {
                        (props.priceMatchingProducts === undefined) ? 
                        <span> Loading price matching products... </span> : 
                        props.priceMatchingProducts.map((pm_product, index) => (
                            <li className="pm-product-li" key={index}>
                                <img  
                                    src={pm_product.productImage}
                                    className="pm-product-image"
                                    alt="Failed to load."
                                />
                                <div className="pm-product-details">
                                    <span className="pm-product-creator"> Creator: {pm_product.productSeller} </span>
                                    <span className="pm-product-title"> { pm_product.productTitle }  </span>
                                    <span className="pm-product-price"> { pm_product.productPrice } </span> 
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

function mapStateToProps(state) {
  return { 
      product: state.productReducer.product,
      user_id: state.loginReducer.user_id,
      priceMatchingProducts: state.productReducer.priceMatchingProducts,
      avgPrice: state.productReducer.avgPrice,
      minPrice: state.productReducer.minPrice,
      maxPrice: state.productReducer.maxPrice,
  };
}

export default connect(mapStateToProps)(Product);