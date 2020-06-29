import React from 'react';
import { easy, normal, hard, veryHard } from './variable';



const Menu = ({onClickJouer, onChangeNiveau, onChangeVision}) => {
    return(
        <div id="Menu">
            <h1> Sudoku !!</h1>
            <div id="selection">
                <div id="niveau">
                    <h2> Choisir le niveau de difficulté !! </h2>
                    <select onChange={onChangeNiveau}>
                        <option value={easy}> Easy </option>
                        <option value={normal}> Normal </option>
                        <option value={hard}> Hard </option>
                        <option value={veryHard}> Very Hard </option>
                    </select>
                    <h2> Mode vision pour plus de facilité :) </h2>
                    <select onChange={onChangeVision}>
                        <option value="yes"> Yes </option>
                        <option value="no"> No, I'm a Pro !!! </option>
                    </select>
                </div>
                <div id="commencer">
                    <h2> La Partie commence ici !!! </h2>
                    <button onClick={onClickJouer}> Jouer </button>
                </div>
            </div>
        </div>
    );
}


export default Menu;