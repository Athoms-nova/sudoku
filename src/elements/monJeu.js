import React from "react";
import Menu from './menu';
import Sudoku from './sudoku';
import {genereChiffreCacher ,afficheGrille, sudokuChiffreAleatoir} from './fonction';
import {resolutionTotal ,copieTableauSudo} from './fonction';
import {styleBloc} from './cssFonction';
import {easy, randomChiffre} from './variable';

class MonJeu extends React.Component{
    constructor(){
        super();
        this.state = {
            actuWindo : "Menu",
            niveau : easy,
            vision : "yes",
            start : false
        }
        this.newGrille = null;//sudokuChiffreAleatoir(20);
        this.solution = null;//sudokuChiffreAleatoir(20);
        this.cssBloc = null;//styleBloc(this.newGrille);
    }

    render(){
        //afficheGrille(this.newGrille);
        return(
            <div id="Jeu">
                {this.state.actuWindo === "Menu" && 
                    <Menu 
                        onChangeNiveau={this.onChangeNiveau} 
                        onChangeVision={this.onChangeVision}
                        onClickJouer={this.onClickJouer}
                    /> 
                }
                {this.state.actuWindo === "jeu" &&
                    <Sudoku 
                        niveau={this.state.niveau} 
                        cssBloc={this.cssBloc}
                        vision={this.state.vision}
                        newGrille={this.newGrille}
                        solution={this.solution}
                        onClickMenu={this.onClickMenu}
                    /> 
                }
            </div>
        );
    }

    nouvellePartie = (nbChiffreCacher) => {
        this.newGrille = sudokuChiffreAleatoir(randomChiffre);
        while(!resolutionTotal(this.newGrille)){ this.newGrille = sudokuChiffreAleatoir(randomChiffre); }
        this.solution = copieTableauSudo(this.newGrille);
        genereChiffreCacher(this.newGrille, nbChiffreCacher);
        this.cssBloc = styleBloc(this.newGrille);
    }

    onChangeNiveau = (event) => { this.setState({ niveau : event.target.value }); }

    onChangeVision = (event) => { this.setState({ vision : event.target.value }); }

    onClickJouer = () => { 
        this.nouvellePartie(this.state.niveau);
        this.setState({ actuWindo : "jeu" }); 
    }

    onClickMenu = () => { 
        this.setState({ 
            actuWindo : "Menu",
            niveau : easy,
            vision : "yes"
        }); 
    }
}


export default MonJeu;