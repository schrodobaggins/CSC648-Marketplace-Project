import React, {useState} from 'react';
import axios from 'axios';
import "./styles.css";
import SelectSearch, {fuzzySearch} from "react-select-search";
import { useRef } from "react";
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
    setCategories,
    getProducts,
    changeDropdownText
  } from '../../redux/actions/productActions';

const Search = (props) => {

    const dispatch = useDispatch(); 

    const items = [
        { name: "Cloths" },
        { name: "Home Decor" },
        { name: "Car" },
        { name: "Accessories" },
        { name: "Shoes" },
        { name: "Electronics" },
        { name: "Books"},
        { name: "Makeup" }
    ];

    const categoryItems = [
        { name: "Clothes" },
        { name: "Shoes" },
        { name: "Electronics" },
    ];

    const history = useHistory();
    const onSubmit = (e) => {
        console.log(e);
        history.push(`?s=${props.searchQuery}`);
        e.preventDefault();
    };  

    const [categoriesMenu, toggleCategoriesMenu] = useState([false]);
    //const [dropdownText, changeDropdownText] = useState(["Categories"]);

    const toggleCategories = () => {
      toggleCategoriesMenu(!categoriesMenu)
    };

    const viewAllProducts = () => {
      axios.get('/api/products')
        .then((res) => {
            dispatch(getProducts(res.data));
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const clickCategory = (text) => () => {
      dispatch(changeDropdownText(text));

      axios.get('/api/product-categories', { params: { category: text }})
        .then((res) => {
            dispatch(getProducts(res.data));
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return(
        <form action="/" method="get" className="filtered-search" onSubmit={onSubmit}>
            <div className="input-button-search">
                <div className="searchbar-wrapper">
                    <span className="dropdown-text" onClick={() => toggleCategories()}> { props.dropdownText } </span> {/*onClick={() => toggleCategories()}*/} 
                    <input
                        className="search-input"
                        value={props.searchQuery}
                        onChange={e => props.setSearchQuery(e.target.value)}
                        type="text"
                        id="header-search"
                        placeholder="Search for products"
                        autoComplete="off"
                        name="s" 
                    />
                    <button className="search-submit" type="submit"> Search </button>
                </div>
                {categoriesMenu == false ? 
                  <ul className="categories" > {/*onMouseLeave={() => toggleCategories()}*/} 
                      <li onClick={viewAllProducts}> View all products </li>
                    {categoryItems.map((item, index) => (
                      <li key={index} onClick={clickCategory(item.name)}> 
                        { item.name }
                      </li>
                    ))}
                  </ul> 
                : null}
            </div>
        </form>
    );
};

function mapStateToProps(state) {
  return { 
    categories: state.productReducer.categories,
    dropdownText: state.productReducer.dropdownText
  };
}

export default connect(mapStateToProps)(Search);

/*

<SelectSearch
        options={options}
        search
        filterOptions={fuzzySearch}
        placeholder="Search for products"
    />



const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const history = useHistory();
    const onSubmit = (e) => {
        history.push(`?s=${searchQuery}`);
        e.preventDefault();
    };
    
const SearchBar = ({ searchQuery, setSearchQuery }) => {

    const history = useHistory();
    const onSubmit = e => {
        history.push(`?s=${searchQuery}`)
        e.preventDefault()
    };

    return(
        <form action="/" method="get">
            <input
                value={searchQuery}
                onInput={e => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                placeholder="Search for products"
                name="s" 
            />
            <button type="submit" onSubmit={onSubmit}>Search</button>
        </form>
    );
};

export default SearchBar;
  const handleFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return options;
      }
      const updatedItems = items.map((list) => {
        const newItems = list.items.filter((item) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        return { ...list, items: newItems };
      });
      return updatedItems;
    };
  };

  return (
    <div className="App">
      <SelectSearch
        ref={searchInput}
        options={options}
        filterOptions={handleFilter}
        value=""
        name="Product"
        placeholder="Search Product"
        search
        onChange={handleChange}
      />
    </div>
  );
}
*/
