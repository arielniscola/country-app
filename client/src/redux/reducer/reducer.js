import { GET_COUNTRIES, GET_COUNTRY_DETAIL, CREATE_TOURIST_ACTIVITY, ERROR, SORT_COUNTRIES, FILTER_COUNTRIES, GET_TOURIST_ACTIVITIES } from "../actions/actions";

const initialState = {
    countries: [],
    country: {},
    activityCreate: {},
    touristActivities: [],
    countriesFiltered: [],
    getcountries: false,
    error: ""
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload.data,
                getcountries: true
            }
        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                country: action.payload.data
            }
        case CREATE_TOURIST_ACTIVITY:
            return{
                ...state,
                activityCreate: action.payload
            }
        case SORT_COUNTRIES:
            return{
                ...state,
                countriesFiltered: action.payload
            }
        case FILTER_COUNTRIES:
            return{
                ...state,
                countriesFiltered: action.payload
            }
        case GET_TOURIST_ACTIVITIES:
            return{
                ...state,
                touristActivities: action.payload.data
            }
        case "ALL_COUNTRIES":
            return{
                ...state,
                countriesFiltered: action.payload
            }
        case "DELETE_DETAIL":
            return{
                ...state,
                country: {}
            }
        case "DELETE_ACTIVITY":
            return{
                ...state,
                activityCreate: {}
            }
        case ERROR:
            return{
                ...state,
                error: action.payload
            }
        case "DELETE_ERROR":
            return{
                ...state,
                error: ""
            }
        default:
            return { ...state }
    }
}

export default rootReducer