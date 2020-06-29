import React from 'react';


const SudoBoutton = ({onClickNouvellePartie, onClickResoudre, onClickMenu}) => {
    return(
        <div id="Boutton">
            <button onClick={onClickNouvellePartie}> Nouvelle partie </button>
            <button onClick={onClickResoudre}> Résoudre </button>
            <button onClick={onClickMenu}> Menu </button>
        </div>
    );
}


export default SudoBoutton;