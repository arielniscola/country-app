import React from "react";
import { Link } from "react-router-dom";

import "./CountryCard.css"


const CountryCard = (props) => {

    return(
        <div className="card">
            <Link to={`/countries/${props.id}`}>
                {
                    props.flag ? (
                        <img src={props.flag} alt={props.name}/>
                    ) : (
                        <img src={""} alt="default" />
                    )
                }
            </Link>
            <h2>{props.name}</h2>
            <h4 className="countryCard">Continents</h4>
            <div>
            <ul className="continents">
                 {
                    props.continents.map(item => 
                        <li key={item}>{item}</li>
                        )
                    }
            </ul>
            </div>
        </div>
    )
}

export default CountryCard