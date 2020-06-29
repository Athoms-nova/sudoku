import React from 'react';


const Option = ({onClickRecommencer, onClickRetour, onChangeRepere}) => {
    return(
        <div id="Option">
            {/* <div className="Time">
                <p style={{textDecoration: "underline" }}> Times </p>
                <p> 00:00:00 </p>
            </div> */}
            <button onClick={onClickRecommencer} > Recommencer </button>
            <button onClick={onClickRetour} > Retour </button>
            <p> 
                <input type="checkbox" name="Repere" onChange={onChangeRepere} />
                Repère 
            </p>
        </div>
    );
}

export default Option;