import React from "react";

const Message = ({msg, bgColor}) => {
    
    let styles = {
        padding: "1rem",
        marginBottom: "1rem",
        textAling: "center",
        fontWeight: "bold",
        backgroundColor: bgColor,
        width: "500px",
        heigth: "200px",
        borderRadius: "5px"
    }

    return(
        <div style={styles}>
            <p>{msg}</p>
        </div>
    )
}

export default Message