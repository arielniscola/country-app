const WSresponse = require('../libs/WSresponse');
const countryService = require('../services/country.service');

const getCountries = async (req, res) => {
    if(req.query.name){
        try {
            const data = await countryService.getCountriesByName(req.query.name);
    
            res.status(200).json(new WSresponse(data, "ok", false, 200))
        } catch (error) {
            res.status(404).json(new WSresponse(null, error, true, 404))
        }
    }else{
        try {
            const data = await countryService.getCountries();
    
            res.status(200).json(new WSresponse(data, "ok", false, 200))
        } catch (error) {
            res.status(404).json(new WSresponse(null, error, true, 404))
        }
    }
}

const getCountryByCode = async (req, res) =>{
    try {
        const code = req.params.code;
        const data = await countryService.getCountryCode(code)

        res.status(200).json(new WSresponse(data, "ok", false, 200))
    } catch (error) {
        res.status(404).json(new WSresponse(null, error, true, 404))
    }
}



module.exports = {
    getCountries,
    getCountryByCode
}