const axios = require('axios');

const getAllCountries = () => {
    return axios.get("https://restcountries.com/v3.1/all")
        .then((result) =>  result.data)
        .catch((err) => err)
}

const getCountryByName = (name) => {
    return axios.get(`https://restcountries.com/v3.1/name/${name}`)
        .then(result => result.data)
        .catch(err =>  err)
}

const getCountryById = (id) => {
    return axios.get(`https://restcountries.com/v2/${id}`)
        .then(result => result.data)
        .catch(err => err)
}

module.exports = {
    getAllCountries,
    getCountryByName,
    getCountryById
}