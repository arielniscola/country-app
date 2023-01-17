import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "../Message/Message";
import "./Response.css";
const Response = (props) =>{
    const { activityCreate , error} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        return function(){
            dispatch({type: "DELETE_ERROR", payload: {}})
            dispatch({type: "DELETE_ACTIVITY", payload: {}})
        }
    },[])
    useEffect(() => {
        setTimeout(() => props.history.push("/countries"), 1500)
    })
    return(
        <div className="message-response">
            {
                activityCreate.error && <Message msg={"Error when creating tourist activity:" + activityCreate.message} bgColor={"rgba(255, 124, 180, 0.61)"}/>
            }
            {
                activityCreate.data && <Message msg={"Tourist activity created"} bgColor={"rgba(149, 255, 219, 0.61)"}/>
            }
        </div>
    )
}

export default Response