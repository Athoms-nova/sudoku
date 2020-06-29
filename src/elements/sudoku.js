import React from 'react';
import Grille from './grille';
import SudoBoutton from './sudoBoutton';
import Option from './option';
import {sudokuChiffreAleatoir, copieTableauSudo, resolutionTotal, posibility} from './fonction';
import {verificationGagner, genereChiffreCacher} from './fonction';
import ChiffrePosible from './chiffrePosible';
import {colorCase, colorVisio, colorChiffreSelect, randomChiffre } from './variable';
import {copieObjet, styleBloc} from './cssFonction';


class Sudoku extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            maGrille : this.props.newGrille,//sudokuChiffreAleatoir(randomChiffre),
            cssBloc : this.props.cssBloc,//styleBloc(sudokuChiffreAleatoir(randomChiffre)),
            posibility : [1,2,3,4,5,6,7,8,9],
            win : undefined,
            caseActu : null
        };
        this.solution = this.props.solution;
        this.colorLigneColonne = [];
        this.colorChiffre = [];
        this.action = [];
        this.modeRepere = false;
    }

    render(){
        return(
            <div id="Sudoku">
                <h1> Sudoku !!! </h1>
                <div className="ecran">
                    <Grille
                        grille={this.state.maGrille}
                        onChangeChiffre={this.onChangeChiffre}
                        cssBloc={this.state.cssBloc}
                        onClickCelle={this.onClickCelle}
                    />
                    <Option
                        onClickRecommencer={this.onClickRecommencer}
                        onClickRetour={this.onClickRetour}
                        onChangeRepere={this.onChangeRepere}
                    />
                </div>
                <ChiffrePosible 
                    posibility={this.state.posibility} 
                    onClickClavierNum={this.onClickClavierNum} 
                />
                <SudoBoutton
                    onClickNouvellePartie={this.onClickNouvellePartie}
                    onClickResoudre={this.onClickResoudre}
                    onClickMenu={this.props.onClickMenu}
                />
                {this.state.win && <h2 className="Win"> You Win </h2>}
                {this.state.win === false && <h2 className="Lose"> You Lose </h2>}
            </div>
        );
    }


//=====================================================================
//===================   Fonction gestion CSS  =========================
//=====================================================================

    modifCSS(celle, style, couleurFond, gras, bordure, couleurText){
        let backgroundColor = style[celle].backgroundColor;
        let fontWeight = style[celle].fontWeight;
        let border = style[celle].border;
        let color = style[celle].color;

        if(typeof couleurFond === "string"){ backgroundColor = couleurFond; }
        if(typeof gras === "string"){ fontWeight = gras; }
        if(typeof bordure === "string"){ border = bordure; }
        if(typeof couleurText === "string"){ color = couleurText; }

        style[celle] = {
            backgroundColor : backgroundColor,
            fontWeight : fontWeight,
            border : border,
            color : color
        }; 
    } 

//=======================================================================


//=====================================================================
//=================== gestion CSS Mode Vision =========================
//=====================================================================

    // Partie récupération des cases à afficher pour le mode vision
    visioLigne= (infoBloc) => {
        let indice = 0;

        if( [3,4,5].indexOf(infoBloc[0]) !== -1 ){ indice = 3; }
        else if( [6,7,8].indexOf(infoBloc[0]) !== -1 ){ indice = 6; }

        for(let numBloc=0; numBloc<3; numBloc++){
            for(let numColonne = 0; numColonne<3; numColonne++){ this.colorLigneColonne.push("case"+(numBloc+indice)+""+infoBloc[1]+""+numColonne); }
        }
    }

    visioColonne = (infoBloc) => {
        let indice = 0;

        if( [1,4,7].indexOf(infoBloc[0]) !== -1 ){ indice = 1; }
        else if( [2,5,8].indexOf(infoBloc[0]) !== -1 ){ indice = 2; } 
        for(let numBloc=0; numBloc<7; numBloc+=3){
            for(let numLigne = 0; numLigne<3; numLigne++){ this.colorLigneColonne.push("case"+(numBloc+indice)+""+numLigne+""+infoBloc[2]); }
        }
    }

    visioChiffre = (chiffre) => {
        this.colorChiffre = [];
        for(let numBloc = 0; numBloc < 9; numBloc++){
            for(let numLigne = 0; numLigne < 3; numLigne++){
                for(let numColonne = 0; numColonne < 3; numColonne++){ 
                    if(this.state.maGrille[numBloc][numLigne][numColonne] === chiffre){ this.colorChiffre.push("case"+numBloc+""+numLigne+""+numColonne); } 
                }
            }
        }
    }

    // Enlever l'affichage du mode vision précedent 
    resetVisio = (style) => {
        if(this.colorLigneColonne.length > 0){
            for(let i=0; i<this.colorLigneColonne.length; i++){ 
                if(style[this.colorLigneColonne[i]].backgroundColor !== colorCase){ this.modifCSS(this.colorLigneColonne[i], style, "white", null, null, null); }
            }
            this.colorLigneColonne = [];
        }

        if(this.colorChiffre.length > 0){ 
            for(let i=0; i<this.colorChiffre.length; i++){ 
                if(style[this.colorChiffre[i]].backgroundColor !== colorCase){ this.modifCSS(this.colorChiffre[i], style, "white", null, null, null); }
            }
            this.colorChiffre = [];
        }
    }

    // Activer l'affichage du mode vision 
    onVisio = (style) => {
        if(this.colorLigneColonne.length > 0){
            for(let i=0; i<this.colorLigneColonne.length; i++){ 
                if(style[this.colorLigneColonne[i]].backgroundColor !=colorCase){ this.modifCSS(this.colorLigneColonne[i], style, colorVisio, null, null, null); }
            }
        }

        if(this.colorChiffre.length > 0){ 
            for(let i=0; i<this.colorChiffre.length; i++){ 
                if(style[this.colorChiffre[i]].backgroundColor !=colorCase){ this.modifCSS(this.colorChiffre[i], style, colorChiffreSelect, null, null, null); }
            }
        }

    }

    // Action à réaliser pour le mode vision
    modeVisio = (infoBloc, chiffre, style) => {
        this.resetVisio(style);
        this.visioColonne(infoBloc);
        this.visioLigne(infoBloc);
        if(typeof chiffre === "number"){ this.visioChiffre(chiffre); }
        this.onVisio(style);
    }

//=====================================================================


//=====================================================================
//================ gestion CSS pour la case selectionner ==============
//=====================================================================

    selectCaseColor = (style, celle) => {
        if(this.state.caseActu !== null){ this.modifCSS(this.state.caseActu, style, "white", null, "black solid 1px", null); }
        this.modifCSS(celle, style, colorCase, null, " solid 1px", null);
    }

//======================================================================


//===========================================================================
//================ gestion CSS pour le mode repère ==========================
//===========================================================================

    colorRepere(style){
        if(this.modeRepere){ this.modifCSS(this.state.caseActu, style, null, null, null, "blue"); }
        else if(style[this.state.caseActu].color === "blue"){ this.modifCSS(this.state.caseActu, style, null, null, null, "black"); }
    }

//===========================================================================


//===========================================================================
//================ gestion CSS pour la correction de la grille ==============
//===========================================================================

    colorCorrection = (style) => {
        for(let numBloc = 0; numBloc < 9; numBloc++){
            for(let numLigne = 0; numLigne < 3; numLigne++){
                for(let numColonne = 0; numColonne < 3; numColonne++){
                    let celle = "case"+numBloc+""+numLigne+""+numColonne;
                    if(style[celle].fontWeight !== "bold"){
                        if(this.state.maGrille[numBloc][numLigne][numColonne] === " "){ this.modifCSS(celle, style, "white", "bold", "black solid 1px", "orange"); }
                        else if(this.state.maGrille[numBloc][numLigne][numColonne] === this.solution[numBloc][numLigne][numColonne]){ this.modifCSS(celle, style, "white", "bold", "black solid 1px", "green"); }
                        else{ this.modifCSS(celle, style, "white", "bold", "black solid 1px", "red"); }
                    }
                    else{ this.modifCSS(celle, style, "white", null, "black solid 1px", null); }
                }
            }
        }
    }

//============================================================================


//===========================================================================
//================ Fonction utile pour notre Jeu ============================
//===========================================================================

    // Fonction pour générer une nouvelle grille de Sudoku
    nouvellePartie = (nbChiffreCacher) => {
        let grille = sudokuChiffreAleatoir(randomChiffre);
        while(!resolutionTotal(grille)){ grille = sudokuChiffreAleatoir(randomChiffre); }
        this.solution = copieTableauSudo(grille);
        genereChiffreCacher(grille, nbChiffreCacher);
        return grille;
    }

    // Fonction permettant d'enregistré chaque action utile fait
    actuAction = (infoBloc) => {
        if(this.action.indexOf(infoBloc[0]+""+infoBloc[1]+""+infoBloc[2]) === -1){ this.action.push(infoBloc[0]+""+infoBloc[1]+""+infoBloc[2]); }
        else{
            this.action.splice(this.action.indexOf(infoBloc[0]+""+infoBloc[1]+""+infoBloc[2]), 1);
            this.action.push(infoBloc[0]+""+infoBloc[1]+""+infoBloc[2]);
        }
    }

//============================================================================

//===========================================================================
//================ Evenement onClick pour la partie en cours ================
//===========================================================================

    // Evenement lors de la selection de la case
    onClickCelle = (event) => {
        let celle = event.target.className;
        let infoBloc = [parseInt(celle[4]), parseInt(celle[5]), parseInt(celle[6])];
        let chiffre = this.state.maGrille[infoBloc[0]][infoBloc[1]][infoBloc[2]];
        let style = copieObjet(this.state.cssBloc);
        this.selectCaseColor(style, celle);

        if(this.props.vision === "yes"){
            let chiffrePossible = posibility(this.state.maGrille, infoBloc);
            this.modeVisio(infoBloc, chiffre, style);
            this.setState({
                cssBloc : style,
                caseActu : celle,
                posibility : chiffrePossible
            });
        }
        else{
            this.setState({
                cssBloc : style,
                caseActu : celle
            });
        }
    }

    // Evenement lors de la selection du chiffre choisie sur le clavier numérique
    onClickClavierNum = (event) => {
        if(this.state.caseActu !== null && this.state.win === undefined && this.state.cssBloc[this.state.caseActu].fontWeight !== "bold"){
            let grille = copieTableauSudo(this.state.maGrille);
            let chiffre = parseInt(event.target.id);
            let infoBloc = [parseInt(this.state.caseActu[4]), parseInt(this.state.caseActu[5]), parseInt(this.state.caseActu[6])];
            let style = copieObjet(this.state.cssBloc);
            
            grille[infoBloc[0]][infoBloc[1]][infoBloc[2]] = chiffre;
            let gagner = verificationGagner(grille);
            this.actuAction(infoBloc);
            this.colorRepere(style, this.state.caseActu);
            this.setState({
                maGrille: grille,
                cssBloc: style,
                win : gagner,
            });
        }
    }

//==============================================================================


//===========================================================================
//================ Evenement clavier (keyboard) =============================
//===========================================================================

    clavierTouch = (event) => {
        if(this.state.caseActu !== null && this.state.cssBloc[this.state.caseActu].fontWeight !== "bold" && this.state.win === undefined){
            let chiffre = parseInt(event.key);
            let infoBloc = [parseInt(this.state.caseActu[4]), parseInt(this.state.caseActu[5]), parseInt(this.state.caseActu[6])];
            if( !isNaN(chiffre) || event.key === "Backspace" ){
                if(event.key === "Backspace"){
                    let grille = copieTableauSudo(this.state.maGrille);
                    grille[infoBloc[0]][infoBloc[1]][infoBloc[2]] = " ";
                    this.action.splice(this.action.indexOf(infoBloc[0]+""+infoBloc[1]+""+infoBloc[2]), 1);
                    this.setState({ maGrille : grille })
                }

                else if(this.props.vision === "yes"){
                    let chiffrePossible = posibility(this.state.maGrille, infoBloc);
                    if( chiffrePossible.indexOf(chiffre) !== -1 ){
                        let grille = copieTableauSudo(this.state.maGrille);
                        grille[infoBloc[0]][infoBloc[1]][infoBloc[2]] = chiffre;
                        let gagner = verificationGagner(grille);
                        this.actuAction(grille);
                        let style = copieObjet(this.state.cssBloc);
                        this.colorRepere(style, this.state.caseActu);
                        this.setState({ 
                            maGrille : grille,
                            cssBloc : style,
                            win : gagner
                        });
                    }
                }
                else if (chiffre !== 0) {
                    let grille = copieTableauSudo(this.state.maGrille);
                    grille[infoBloc[0]][infoBloc[1]][infoBloc[2]] = chiffre;
                    let gagner = verificationGagner(grille);
                    this.actuAction(grille);
                    let style = copieObjet(this.state.cssBloc);
                    this.colorRepere(style, this.state.caseActu);
                    this.setState({
                        maGrille: grille,
                        cssBloc: style,
                        win : gagner
                    });
                }
            }
        }
    }

//==============================================================================


//===========================================================================
//================ Gesttion Boutton Reset et Recommencer =====================
//===========================================================================

    // Boutton recommencer pour remettre à zéro la grille
    onClickRecommencer = () => {
        if(this.action.length > 0 && this.state.win === undefined){
            let grille = copieTableauSudo(this.state.maGrille);
            for(let i=0; i<this.action.length; i++){
                let infoBloc = this.action[i];
                infoBloc = [parseInt(infoBloc[0]), parseInt(infoBloc[1]), parseInt(infoBloc[2])];
                grille[infoBloc[0]][infoBloc[1]][infoBloc[2]] = " ";
            }
            this.action = [];
            this.setState({maGrille : grille });
        }
    }

    // Boutton Retour
    onClickRetour = () => {
        if(this.action.length > 0 && this.state.win === undefined){
            let style = copieObjet(this.state.cssBloc);
            let grille = copieTableauSudo(this.state.maGrille);
            let infoBloc = this.action[this.action.length-1];
            infoBloc = [parseInt(infoBloc[0]), parseInt(infoBloc[1]), parseInt(infoBloc[2])];
            console.log(infoBloc);
            this.selectCaseColor(style ,"case"+infoBloc[0]+""+infoBloc[1]+""+infoBloc[2]);
            grille[infoBloc[0]][infoBloc[1]][infoBloc[2]] = " ";
            this.action.pop();
            this.setState({ 
                maGrille : grille,
                caseActu : "case"+infoBloc[0]+""+infoBloc[1]+""+infoBloc[2],
                cssBloc : style
            });
        }
    }

//==============================================================================


//===========================================================================
//================ Evenement onChange du checkbox mode repere ===============
//===========================================================================

    onChangeRepere = (event) => { this.modeRepere = event.target.checked; }

//==============================================================================


//===========================================================================
//================ Boutton Nouvelle Partie et Résoudre ======================
//===========================================================================

    // Boutton Resoudre pour afficher la solution
    onClickResoudre = () => { 
        if(this.state.win === undefined){
            let style = copieObjet(this.state.cssBloc);
            this.colorCorrection(style);
            this.setState({
                maGrille : this.solution,
                cssBloc : style,
                win : false
            });
        }
    }


    // Boutton Nouvelle partie pour génerer une nouvelle grille
    onClickNouvellePartie = () => {
        let grille = this.nouvellePartie(this.props.niveau); 
        let style = styleBloc(grille);
        this.action = [];
        this.setState({
            maGrille : grille,
            cssBloc : style,
            win : undefined,
            caseActu : null
        });
    }

//==============================================================================
    componentDidMount(){
        // Ajouter l'API pour le clavier
        document.addEventListener('keydown', this.clavierTouch);
    }
}


export default Sudoku;