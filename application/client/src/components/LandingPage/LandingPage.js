import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import CheckBox from './Sections/CheckBox';
import RadioBox1 from './Sections/RadioBox1';
import { location, shipping, price, condition } from './Sections/Datas';
import RadioBox2 from './Sections/RadioBox2';
import RadioBox3 from './Sections/RadioBox3';

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)

    const [Filters, setFilters] = useState({
        location: [],
        price: [],
        shipping: []
    })

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        // getProducts(variables)

    }, [])

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        // getProducts(variables)
        setSkip(0)

    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    return (
        <div className = "landingpage">
        <ul style={{listStyleType: 'none'}}>         
                   <li> <CheckBox list={location}
                        handleFilters={filters => handleFilters(filters, "location")} /> <br></br> </li>
                    <li>  <RadioBox1
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}
                    /> <br></br> </li>
                  <li><RadioBox2
                        list={shipping}
                        handleFilters={filters => handleFilters(filters, "shipping")}
                    /> <br></br> </li>
               <li>  <RadioBox3
                        list={condition}
                        handleFilters={filters => handleFilters(filters, "condition")}
                    /> <br></br> </li>
            </ul>
        </div>
    )
}

export default LandingPage
