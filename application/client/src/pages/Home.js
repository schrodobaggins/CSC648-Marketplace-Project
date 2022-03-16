import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import NavBar from '../components/Modules/NavBar';
import Footer from '../components/Modules/Footer'
import Search from '../components/Modules/Search';
import LandingPage from '../components/LandingPage/LandingPage';
import { connect, useDispatch } from 'react-redux';
import {
  getProducts
} from '../redux/actions/productActions';


const theme = createMuiTheme({
    palette: {
      primary: {
        main:"#2e1667",
      },
      secondary: {
        main:"#c7d8ed",
      },
    },
    typography: {
      fontFamily: [
        'Roboto'
      ],
      h4: {
        fontWeight: 600,
        fontSize: 28,
        lineHeight: '2rem',
        },
      h5: {
        fontWeight: 100,
        lineHeight: '2rem',
      },
    },
  });
  
  const styles = makeStyles({
    wrapper: {
      width: "50%",
      margin: "auto",
      textAlign: "center",
      marginTop: "50px",
      marginBottom: "50px"
    },
    bigSpace: {
      marginTop: "0.0rem"
    },
    littleSpace:{
      marginTop: "2.0rem",
    },
  })


const Home = (props) => {

  const dispatch = useDispatch(); 
  const classes = styles();

  useEffect(() => {
      axios.get('/api/products')
          .then((res) => {
              dispatch(getProducts(res.data));
              console.log(res);
          })
          .catch((err) => {
              console.log(err);
          });
  }, []);

  /*
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  */

  //search bar
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');

  //search bar filter
  const filterProducts = (products, query) => {
    if(!query) {
      return products;
    }

    return products.filter((product) => {
      const productTitle = product.title.toLowerCase();
      return productTitle.includes(query);
    });
  };

  const filteredProducts = filterProducts(props.products, query);

  return (
    <ThemeProvider className="home-wrapper" theme = {theme}>
      <NavBar page={"Home"}/>

      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      
      <div className={classes.wrapper}>
        <Typography className={classes.bigSpace} color="primary">
          At Dropsell, we buy and sell products
        </Typography>
        <Typography className={classes.littleSpace} color="primary">
          New kind of Marketplace bring people together for local as well as global sale of their stuff. Our Marketplace is on a mission to become the simplest, most trustworthy and fast buying and selling experience.
        </Typography>
      </div>

      <div className="mainpage-wrapper">
        <LandingPage />

        <ul className="searchable-product-list-ul" style={{listStyleType: 'none'}} >
          <div className="searchable-product-list">
            {filteredProducts.map((product) => (
              <li className="product-li" key={product.product_id}> 
                <Link style={{ textDecoration: 'none' }} className="product-wrapper" to={`/product/${product.product_id}`}>
                  <img  
                    src={`/uploads/${product.image}`}
                    className="product-image"
                    alt="Failed to load."
                  />
                  <div className="product-title-creator">
                    <h3 className="product-title"> { product.title }  </h3>
                    <h4 className="product-creator"> Created by <span> {product.creator} </span> </h4>
                  </div>
                  <div className="product-price-rating-purchases">
                    <div className="price-rating-purchases">
                      <h5 className="product-price"> $ <span> { product.price } </span> </h5>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </div>
      <Footer/>
    </ThemeProvider>
  );
};

function mapStateToProps(state) {
  return { products: state.productReducer.products };
}

export default connect(mapStateToProps)(Home);
