import React from "react";
import { Link } from "react-router-dom";

import "./Home.css"
import GloboImg from "../../../img/globoTerraqueo.png";
const Home = () => {

    return(
        <div className="home-page">
            <div className="home-elem">
                <div className="title">
                    <h2>
                        Find all countries of the world!
                    </h2>
                </div>
                <Link to="/countries">
                    <button className="countries-btn">VIEW COUNTRIES</button>
                </Link>
            </div>
            <div>
                <div className="globo-terraqueo">
                    <img src={ GloboImg } alt="globo" />
                </div>
            </div>
        </div>
    )
}

export default Home