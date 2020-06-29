import React from 'react';


const ChiffrePosible = ({posibility, onClickClavierNum}) => {
    let indice = 0;
    return(
        <div className="clavier">
            {posibility.map(item => (
                <button key={indice++} id={item} onClick={onClickClavierNum}> {item} </button>
            ))}
        </div>
    );
}


export default ChiffrePosible;