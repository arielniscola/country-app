const { TouristActivity, Country } = require('../db');

const getAllActivities = async () => {
    const data = await TouristActivity.findAll();

    if(!data) throw "No tourist activities found"
    return data
}

const getActivityID = async (id) => {
    const data = await TouristActivity.findByPk(id);
    if(!data) throw "ID incorrect"
    return data
}

const createActivity = async (activity, file) => {
    const { name, duration, seasons, difficulty, countries, img } = activity
   
    if(!name || !duration) throw "Required data missing"

    if( 0 > difficulty && difficulty > 5) throw "Difficulty value between 1 - 5"

    if(typeof name !== "string" || typeof duration !== "number") throw "Data type incorrect"

    if(countries.length === 0) throw "One country at least"

    const newActivity = await TouristActivity.create(
        {
            name,
            duration,
            seasons,
            difficulty,
            img: file ? `http://localhost:8080/uploads/${file.filename}`: ""
        })

    //relations with countries
    for (const country of countries) {
        
        const ctry = await Country.findOne({
            where: { name: country },
          })
          if(!ctry) throw "country not found"
          newActivity.addCountries(ctry)
    }
    return newActivity
}


module.exports = {
    getAllActivities,
    getActivityID,
    createActivity
}

