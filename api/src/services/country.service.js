const externalApi = require('../utils/externalServiceApi');
const { formatCountryApi, formatCountriesDB } = require('../utils/formatData');
const { Country } = require('../db');
const { TouristActivity } = require('../db');

const getCountries = async () => {
    let data = null;
    let {count, rows } = await Country.findAndCountAll({ include: TouristActivity});
    
    if(count === 0) {
        data = await externalApi.getAllCountries();
        if(!data) throw "not data found" 
        result = formatCountryApi(data);
        const dataCreate = await Country.bulkCreate(result);             
        return result
    }
    data = formatCountriesDB(rows)
    return data
}

const getCountryCode = async (id) => {
    const data = await Country.findByPk(id, {
        include: TouristActivity
    })

    if(!data) throw "Country code incorrect"

    return data
}
 
const getCountriesByName = async (name) =>{
    const data  = await Country.findOne();

    if(!data) throw "Country not found"

    return data
}


module.exports = {
    getCountries,
    getCountryCode,
    getCountriesByName
}