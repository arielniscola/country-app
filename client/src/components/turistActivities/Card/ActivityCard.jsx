import React from "react";
import { Link } from "react-router-dom";

import "./ActivityCard.css"


const ActivityCard = (props) => {

    return(
        <div className="card-activity">
            <h3>{props.name}</h3>
                {
                    props.img ? (
                        <img src={props.flag} alt={props.name}/>
                    ) : (
                       <p>Not image</p>
                    )
                }
                <div className="item-card">
                    <h5>Difficulty:</h5>
                    <p>{props.difficulty}</p>
                    <h5>Duration:</h5>
                    <p>{props.duration} hs.</p>
                </div> 
            <h4 className="countryCard">Seasons:</h4>
            <div>
            <ul className="seasons">
                 {
                    props.seasons.map(item => 
                        <li key={item}>{item}</li>
                        )
                    }
            </ul>
            </div>

        </div>
    )
}

export default ActivityCard