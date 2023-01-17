import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getTouristActivities, sortCuntries, filterCountries } from "../../../redux/actions/actions";

import CountryCard from "../Card/CountryCard";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import "./ListCountries.css";

const ListCountries = () => {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const getcountries = useSelector((state) => state.getcountries)
    let countriesFiltered = useSelector((state) => state.countriesFiltered);
    const touristActivities = useSelector((state) => state.touristActivities);
    const [search, setSearch] = useState("")
    const [listSearch, setListSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [sorter, setSorter] = useState("");
    const [direction, setDirection] = useState("");

    useEffect(() => {
        if(!getcountries ){
            dispatch(getCountries());
        }
        dispatch(getTouristActivities())
    }, []);
    useEffect(() => {
        if(countriesFiltered.length === 0) dispatch(filterCountries(countries, "continents"))
    }, [countries])
    useEffect(() => {   
        setListSearch(countries.filter(item =>
            item.name.toLowerCase().includes(search)
        ));
        setCurrentPage(0);
      }, [search]);

    //pagination
    const nexPage = () => {
        setCurrentPage(currentPage + 1);
    }
    const prevPage = () => {
        setCurrentPage(currentPage -1);
    }   

    //seach handler
    const onchangeSearch = ({target}) => {
        if(target.value.length < search.length) {
          setListSearch(countriesFiltered)
        }
        setSearch(target.value)
    }
    
    const filterHandler = (event) => {
        if(event.target.value === "all"){
            dispatch(filterCountries(countries, event.target.name))
        }else{
            dispatch(filterCountries(countries, event.target.name ,event.target.value))
        }
    }
    //handler filter and sort
    const directionSortHandler = (event) => {
        if(sorter){
            dispatch(sortCuntries(countriesFiltered, sorter, event.target.value))
        }
        setDirection(event.target.value)
    }

    const sortTypeHandler = (event) =>{
        if(direction){
            dispatch(sortCuntries(countriesFiltered, event.target.value, direction))
        }
        setSorter(event.target.value)   
    }

    return(
        <div className="container">
            <div className="title">
                <h1>Countries</h1>
            </div>
            <div className="filterbar">
            <div className="order-select">
                <p>Order By:</p>
               <select name="property" id="property" onChange={sortTypeHandler}>
                    <option value="">---</option>
                    <option value="name">Name</option>
                    <option value="population">Population</option>
               </select>
               <select name="order" id="order" onChange={directionSortHandler}>
                    <option value="">---</option>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
               </select>
               {/* <button onClick={sortHandler}>Sort</button> */}
            </div>
            <div>
                <p>Tourist Activities</p>
                <select name="TouristActivities" id="TouristActivities" onChange={filterHandler} >
                    <option value="all">All</option>
                    {
                        touristActivities.map((item )=> 
                            <option key={item.id} value={item.name}>{item.name}</option>
                        )
                    }
                </select>
            </div>
            <div>
                <p>Continents</p>
                <select name="continents" id="continents" onChange={filterHandler} >
                    <option value="all">All</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            <div className="search">
                <p>Search</p>
                <input placeholder="Seach by Name" onChange={onchangeSearch}></input>
            </div>
        </div>
                {
                    countriesFiltered.length === 0 && getcountries &&  
                    countries
                    .slice(currentPage * 10, (currentPage + 1) * 10) 
                    .map((country) =>
                        <CountryCard 
                            key={country.id}
                            id={country.id}
                            name={country.name}
                            flag={country.flag}
                            continents={country.continents}
                        />
                    )
                }
                {
                    countriesFiltered && search.length === 0 &&
                    countriesFiltered
                    .slice(currentPage * 10, (currentPage + 1) * 10) 
                    .map((country) =>
                        <CountryCard 
                            key={country.id}
                            id={country.id}
                            name={country.name}
                            flag={country.flag}
                            continents={country.continents}
                        />
                    )
                }
                {
                    countriesFiltered && search.length !== 0 &&
                    listSearch
                    .slice(currentPage * 10, (currentPage + 1) * 10) 
                    .map((country) =>
                        <CountryCard 
                            key={country.id}
                            id={country.id}
                            name={country.name}
                            flag={country.flag}
                            continents={country.continents}
                        />
                    )
                }
                {
                  countriesFiltered && search.length !== 0 && listSearch.length === 0 &&
                  <div className="loader">
                    <Message msg={"Countries not found"} bgColor={"rgba(255, 0, 56, 0.21)"}/>
                  </div> 
                }
        {
            countries.length === 0 && 
            <div className="loader">
                <Loader />
            </div>
        }

        { countries.length !== 0  &&
            <div className="pagination">
                    <button onClick={prevPage} disabled={currentPage===0}>Prev</button>
                    <p>{currentPage}</p>
                    <button onClick={nexPage} disabled={((currentPage + 1 ) * 10) > (countriesFiltered.length) || listSearch.length < 10}>Next</button>
            </div>
        }
        </div>
    )
}

export default ListCountries