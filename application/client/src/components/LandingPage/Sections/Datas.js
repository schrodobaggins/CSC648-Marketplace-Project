
const price = [
    {
        "_id": 0,
        "name": "Any",
        "array": []
    },
    {
        "_id": 1,
        "name": "$0 to $199",
        "array": [0, 199]
    },
    {
        "_id": 2,
        "name": "$200 to $299",
        "array": [200, 249]
    },
    {
        "_id": 5,
        "name": "More than $300",
        "array": [300, 1500000]
    }
]



const location = [
    {
        "_id": 1,
        "name": "San Francisco"
    },
    {
        "_id": 2,
        "name": "Fremont"
    },
    {
        "_id": 3,
        "name": "Palo Alto"
    },
    {
        "_id": 4,
        "name": "Hayward"
    },
    {
        "_id": 5,
        "name": "Sunnyvale"
    },
]

const shipping = [
    {
        "_id": 1,
        "name": "Pickup"
    },
    {
        "_id": 2,
        "name": "Delivery"
    }
]

const condition = [
    {
        "_id": 1,
        "name": "New"
    },
    {
        "_id": 2,
        "name": "Used"
    }
]

export {
    price,
    location,
    shipping,
    condition
}