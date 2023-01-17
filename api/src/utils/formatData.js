const formatCountryApi = (data) => {
    const formatData = [];

    for (const item of data) {
        const aux = {
            id: item.cca3,
            name: item.name.official,
            flag: item.flags.png,
            continents: item.continents,
            capital: item.capital,
            subregion: item.subregion,
            area: item.area,
            population: item.population
        }
        formatData.push(aux)
    }
    return formatData
}

const formatCountriesDB = (data) =>{
    const formatData = [];

    for (const item of data) {
        const aux = {
            id: item.id,
            name: item.name,
            flag: item.flag,
            continents: item.continents,
            capital: item.capital,
            subregion: item.subregion,
            area: item.area,
            population: item.population,
            TouristActivities: item.TouristActivities.map(item => {
                return item.name
            })
        }
        formatData.push(aux)
    }
    return formatData
}


module.exports = {
    formatCountryApi,
    formatCountriesDB
}