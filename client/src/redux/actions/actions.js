import URL_API from "../../config";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const CREATE_TOURIST_ACTIVITY = "CREATE_TOURIST_ACTIVITY";
export const GET_TOURIST_ACTIVITIES = "GET_TOURIST_ACTIVITIES";
export const FILTER_COUNTRIES = "FILTER_COUNTRIES";
export const SORT_COUNTRIES = "SORT_COUNTRIES";
export const ERROR = "ERROR";

export const getCountries = () => {
  return function (dispatch) {
    fetch(`${URL_API}/countries`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_COUNTRIES, payload: data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
  };
};

export const getCountryDetail = (id) => {
  return function (dispatch) {
    fetch(`${URL_API}/countries/${id}`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_COUNTRY_DETAIL, payload: data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
  };
};

export const createTouristActivity = (data) => {
  return function (dispatch) {
    fetch(`${URL_API}/activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: CREATE_TOURIST_ACTIVITY, payload: data })
      )
      .catch((error) => dispatch({ type: ERROR, payload: error }));
  };
};
export const uploadImg = (data) => {
  return function (dispatch) {
    fetch(`${URL_API}/activities/upload-img`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "UPLOAD-IMG", payload: data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
  };
};

export const getTouristActivities = () => {
  return function (dispatch) {
    fetch(`${URL_API}/activities`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_TOURIST_ACTIVITIES, payload: data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
  };
};

export const filterCountries = (countries, filter, value) => {
  console.log(countries, filter, value);
  console.log(
    countries.filter((item) => (value ? item[filter].includes(value) : true))
  );
  return function (dispatch) {
    dispatch({
      type: FILTER_COUNTRIES,
      payload: countries.filter((item) =>
        value ? item[filter].includes(value) : true
      ),
    });
  };
};

export const sortCuntries = (countries, sortType, direction) => {
  return function (dispatch) {
    dispatch({
      type: SORT_COUNTRIES,
      payload:
        direction === "asc"
          ? countries.sort((a, b) =>
              a[sortType] > b[sortType] ? 1 : b[sortType] > a[sortType] ? -1 : 0
            )
          : countries.sort((a, b) =>
              a[sortType] < b[sortType] ? 1 : b[sortType] < a[sortType] ? -1 : 0
            ),
    });
  };
};
