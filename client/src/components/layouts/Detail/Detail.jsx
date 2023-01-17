import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../../redux/actions/actions";
import DefaultImage from "../../../img/image-default.png"
import Loader from "../Loader/Loader";
import ActivityCard from "../../turistActivities/Card/ActivityCard";

import "./Detail.css";

const CountryDetail = (props) => {
    const dispatch = useDispatch();
    const countryID = props.match.params.id;
    const country = useSelector((state) => state.country);

    useEffect(() => {
        dispatch(getCountryDetail(countryID));
        return function(){
            dispatch({type: "DELETE_DETAIL", payload: {}})
        }
    }, [])


    return(
        <div className="country-detail">
            { Object.keys(country).length !== 0 && 
            <div className="card-detail">
              <div className="country-detail">
                  <h4><b>{country.name}</b></h4>
                  {
                    country.flag ? (<img src={country.flag} alt={country.name} />) 
                            :
                                (<img src={DefaultImage} alt="default" />)
                    }
                <div className="element">
                  <div className="subelement">
                    <h4>Capital:</h4>
                    <p>{country.capital}</p>  
                  </div>     
                <div className="subelement">
                  <h4>Continents:</h4>
                  <ul>
                      {country.continents.map(item => 
                          <li key={item}>{item}</li>    
                      )}
                  </ul>
                </div>                        
                </div>
                <div className="element">
                    <div className="subelement">
                        <h4>Subregion:</h4>
                        <p>{country.subregion}</p>
                    </div>
                    <div className="subelement">
                        <h4>Area:</h4>
                        <p>{country.area} km2</p>
                    </div>
                    <div className="subelement">
                        <h4>Populate:</h4>
                        <p>{country.population} hab.</p>
                    </div>
                </div>
                <div className="subelement">
                  <h4>Tourist Activities</h4>
                  <ul>
                      { country.TouristActivities.length !== 0  && country.TouristActivities.map(item => 
                          <ActivityCard key={item.id} name={item.name} duration={item.duration} img={item.img} difficulty={item.difficulty} seasons={item.seasons}/>     
                      )}
                      {
                        country.TouristActivities.length === 0 && <p>Not tourist activities</p>
                      }
                  </ul>
                </div>
              </div>
            </div>
        }
        {
            Object.keys(country).length === 0 && 
                <div className="loader">
                 <Loader/>
                </div>
        }

            <div>
                <Link to="/countries">
                    <button className="back-btn">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CountryDetail;