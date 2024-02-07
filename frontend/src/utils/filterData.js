const continents = [
    {
        "_id": 1,
        "name": "Africa"
    },
    {
        "_id": 2,
        "name": "Europe"
    },
    {
        "_id": 3,
        "name": "Asia"
    },
    {
        "_id": 4,
        "name": "North America"
    },
    {
        "_id": 5,
        "name": "South America"
    },
    {
        "_id": 6,
        "name": "Australia"
    },
    {
        "_id": 7,
        "name": "Antarctica"
    }
];

const price = [
    {
        "_id": 0,
        "name": "모두",
        "array": []
    },
    {   
        "_id": 1,
        "name": "0 ~ 999원",
        "array": [0, 999]
    },
    {
        "_id": 2,
        "name": "1000 ~ 1999원",
        "array": [1000, 1999]
    },
    {
        "_id": 3,
        "name": "2000 ~ 2999원",
        "array": [2000, 2999]
    },
    {
        "_id": 4,
        "name": "3000 ~ 3999원",
        "array": [3000, 3999]
    },
    {
        "_id": 5,
        "name": "4000 ~ 4999원",
        "array": [4000, 4999]
    },
    {
        "_id": 6,
        "name": "5000원 이상",
        "array": [5000, 99999999]
    }
];

export { continents, price }
