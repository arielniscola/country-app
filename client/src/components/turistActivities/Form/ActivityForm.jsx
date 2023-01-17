import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { createTouristActivity, getCountries, uploadImg } from "../../../redux/actions/actions"; 

import "./ActivityForm.css";
import IconDelete from '../../../img/delete.ico';

const ActivityForm = (props) => {
    const dispatch = useDispatch()
    const countries = useSelector((state)=> state.countries);
    const [file, setFile] = useState();
    const [errors, setErrors] = useState({
        errorName: null,
        errorDuration: null,
        errorSeasons: null,
        errorDifficulty: null,
        errorCountries: null
    });
    const [input, setInput] = useState({
        name: "",
        duration: undefined,
        difficulty: undefined,
        seasons: [],
        countries: [],
        img: {}
    });

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    //event chage inputs
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        switch (property) {
            case "countries":
                const exist =  input.countries.find(elem => elem === value);
                if(!exist) {
                input.countries.push(value);              
                setInput({
                    ...input,
                    [property]: input.countries
                })
                }
                break
            case "seasons":
                const exists =  input.seasons.find(elem => elem === value);
                if(!exists) {
                input.seasons.push(value);              
                setInput({
                    ...input,
                    [property]: input.seasons
                })
                }
                break;
            case "duration":
                setInput({
                    ...input,
                    [property]: parseFloat(value)
                })
                break;
            case "difficulty":
                setInput({
                    ...input,
                    [property]: parseInt(value)
                });
                break;
            case "img":
                setFile(URL.createObjectURL(event.target.files[0]))
                setInput({
                    ...input,
                    [property]: event.target.files[0]
                });
                break;
            default:
                setInput({
                    ...input,
                    [property]: value
                })
                break;
        }
    }
    // event fields validation
    const validations = (event) =>{
        switch (event.target.name) {
            case "name":
                if(!input.name){
                    setErrors({...errors, errorName: "Name is required"})
                }else{
                    setErrors({...errors, errorName: null})
                }
                break;
            case "difficulty":
                if(!input.difficulty){
                    setErrors({...errors, errorDifficulty: "Difficulty is required"})
                }else if( 0 > input.difficulty || input.difficulty > 5){
                    setErrors({...errors, errorDifficulty: "Value must be between 1 - 5"})
                }else{
                    setErrors({...errors, errorDifficulty: null})
                }
                break;
            case "duration":
                if(!input.difficulty){
                    setErrors({...errors, errorDuration: "Duration is required"})
                }else if( 0 > input.duration || input.duration > 100){
                    setErrors({...errors, errorDifficulty: "Value incorrect"})
                }else{
                    setErrors({...errors, errorDuration: null})
                }
                break;
            case "countries":
                if(!input.countries.length < 1){
                    setErrors({...errors, errorCountries: "Select one country at least"})
                }
                break;
            case "countries":
                if(!input.seasons.length < 1){
                    setErrors({...errors, errorSeasons: "Select one seasons at least"})
                }
                break;    
            default:
                break;
        }
    }
    const deleteCountry = (country) => {
        setInput({
            ...input,
            ["countries"]: input.countries.filter((item) => item !== country)
        })
    }
    const deleteSeason = (seasons) => {
        setInput({
            ...input,
            ["seasons"]: input.seasons.filter((item) => item !== seasons)
        })
    }
  
    const submitHandler = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("img", input.img)
        dispatch(uploadImg())
       dispatch(createTouristActivity(input));
        setInput({
            name:"",
            difficulty: undefined,
            duration: undefined,
            seasons: [],
            countries: [],
            img: {}
        });
        props.history.push("/country/activity-response");
    }
    return(
        <div className="form">
            <h2 className="title-form"></h2>
            <form id="form" onSubmit={submitHandler}>
                <div className="row">
                    <p>Tourist Activity Name</p>
                    <input type="text" className="field" onBlur={validations} name="name" value={input.name} onChange={changeHandler}></input>
                    {
                        errors.errorName && <p className="errorInput">{errors.errorName}</p>
                    }
                    <p>Difficulty</p>
                    <input type="number" className="field" onBlur={validations} name="difficulty" value={input.difficulty} onChange={changeHandler}></input>
                    {
                        errors.errorDifficulty && <p className="errorInput">{errors.errorDifficulty}</p>
                    }
                    <p>Duration</p>
                    <input type="number" className="field" onBlur={validations} name="duration" value={input.duration} onChange={changeHandler}/>
                    {
                        errors.errorDuration && <p className="errorInput">{errors.errorDuration}</p>
                    }
                    <p>Seasons:</p>
                    <div className="content-select-form">
                        <select  name="seasons" id="seasons" onChange={changeHandler}>
                            <option value="">---</option>
                            <option value="Summer">Summer</option>
                            <option value="Winter">Winter</option>
                            <option value="Fall">Fall</option>
                            <option value="Spring">Spring</option>
                        </select>
                    </div>
                    <div className="options-plat">
                        <ul>
                             {
                                input.seasons.map((item )=> 
                                <div className="options-plat">
                                    <li key={item}>{item}</li><img key={item} onClick={() => deleteSeason(item)} src={IconDelete} />
                                </div>
                                )                                
                            }
                        </ul>
                    </div>
                    <p>Countries</p>
                    <div className="content-select-form">
                        <select name="countries" id="countries" onChange={changeHandler}>
                            <option value="all">All</option>
                            {
                                countries.map((item )=> 
                                     <option key={item.id} value={item.name}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="options-countries">
                        <ul>
                             {
                                input.countries.map((item )=> 
                                <div className="options-countries">
                                    <li key={item}>{item}</li><img key={item} onClick={() => deleteCountry(item)} src={IconDelete} />
                                </div>
                                )
                            }
                        </ul>
                    </div>
                    <div className="imagen">
                        <p>Select image Activity:</p>
                            <input type="file" id="img" name="img" onChange={changeHandler} />
                            <img src={file} />
                    </div>
                    <div className="buttons">
                            <div className="btn-right">
                                <button className="btn-create" disabled={input.countries.length === 0 ||input.seasons.length === 0 || !input.name || !input.duration || input.difficulty > 5 } type="submit">Create</button>  
                            </div>
                            <div className="btn-left">
                                <Link to="/">
                                    <button className="btn-create" type="submit">Cancel</button>
                                </Link>
                            </div>
                        </div>
                </div>     
            </form>
        </div>
    )
}


export default ActivityForm