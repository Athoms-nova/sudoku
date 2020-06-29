/*
function afficheDeuxGrille( grille1, grille2 ){
    let i = 0;
    console.log("===================================================");
    for(let ligneTotal = 0; ligneTotal < 9; ligneTotal++){
        if( ligneTotal > 2 && ligneTotal < 6){ i=3; }
        else if( ligneTotal > 5 ){ i=6; }
        console.log( grille1[0+i][ligneTotal-i] + " | " + grille1[1+i][ligneTotal-i] + " | " + grille1[2+i][ligneTotal-i] + "    ||   " 
        + grille2[0+i][ligneTotal-i] + " | " + grille2[1+i][ligneTotal-i] + " | " + grille2[2+i][ligneTotal-i] );
        if( ligneTotal === 2 || ligneTotal === 5 ){ console.log(""); }
    }
    console.log("===================================================");
}*/

function afficheGrille(grille){
    let i = 0;
    console.log("===================================================");
    for(let ligneTotal = 0; ligneTotal < 9; ligneTotal++){
        if( ligneTotal > 2 && ligneTotal < 6){ i=3; }
        else if( ligneTotal > 5 ){ i=6; }
        console.log( grille[0+i][ligneTotal-i] + " | " + grille[1+i][ligneTotal-i] + " | " + grille[2+i][ligneTotal-i]);
        if( ligneTotal === 2 || ligneTotal === 5 ){ console.log(""); }
    }
    console.log("===================================================");
}

const TableauSudokuVide = (valeur) => {
    let sudoVide = [ [], [], [], [], [], [], [], [], [] ];
    for(let nBloc = 0; nBloc < 9; nBloc++){ 
        for(let nligne = 0; nligne < 3; nligne++){
            sudoVide[nBloc].push([]);
            for(let nColonne = 0; nColonne < 3; nColonne++){ sudoVide[nBloc][nligne].push(valeur); }
        }
    }
    return sudoVide;
} 

const copieTableauSudo = ( grille ) => {
    let tab = TableauSudokuVide(" ");
    for(let numBloc = 0; numBloc < 9; numBloc++){
        for(let numLigne = 0; numLigne < 3; numLigne++){
            for(let numColonne = 0; numColonne < 3; numColonne++){ tab[numBloc][numLigne][numColonne] = grille[numBloc][numLigne][numColonne] }
        }
    }
    return tab;
}

// Fonction qui genere un chiffre aleatoire entier 
const chiffreAleatoire = (valMin, valMax) => {
    return Math.floor(Math.random() * (valMax + 1 - valMin) + valMin);
}

// Fonction pemetant de verifier si le chiffre est dans le mini bloc
const inBloc = (chiffre, block) => {
    let validation = true;
    let indice = 0;
    while(indice < 3 && validation){
        if(block[indice].indexOf(chiffre) !== -1){ validation = false; }
        indice++
    }
    return validation;
}

// Fonction permetand de verifier que le chiffre n'est pas deja dans le bloc, ligne ou colonne
const valideChiffre = (chiffre, block, ligne, colonne) => {
    let validation = true;
    if( !inBloc(chiffre, block) || ligne.indexOf(chiffre) !== -1 || colonne.indexOf(chiffre) !== -1 ){ validation = false; }
    return validation;
}

// Fonction permetant de retourner un tableau avec les chiffres que peut contenir la celulle
const chiffresPossible = (block, ligne, colonne) => {
    let tabChiffres = [1,2,3,4,5,6,7,8,9];
    let possible = [];
    for(let i=0; i<tabChiffres.length;i++){
        if( valideChiffre(tabChiffres[i], block, ligne, colonne) ){ possible.push(tabChiffres[i]) }
    }
    return possible;
}

// fonction permetant de recupérer tout la colonne de grille ou est situer la celule
const tableauColonne = (numBloc, numColonne, bloc) => {
    let colonne = [];
    let indice = null;

    if( [0,3,6].indexOf(numBloc) !== -1 ){ indice = 0; }
    else if( [1,4,7].indexOf(numBloc) !== -1 ){ indice = 1; }
    else if( [2,5,8].indexOf(numBloc) !== -1 ){ indice = 2; }    

    if(typeof indice === "number"){ for(let i = 0; i<7; i+=3){ bloc[i+indice].map( ligne => ( colonne.push(ligne[numColonne] ) )); } }
    else{ console.log("erreur"); }

    return colonne;
}

// fonction permetant de recupérer tout la ligne de grille ou est situer la celule
const tableauLigne = (numBloc, numLigne, bloc) => {
    let ligne = [];
    let indice = null;

    if( [0,1,2].indexOf(numBloc) !== -1 ){ indice = 0; }
    else if( [3,4,5].indexOf(numBloc) !== -1 ){ indice = 3; }
    else if( [6,7,8].indexOf(numBloc) !== -1 ){ indice = 6; }

    if(typeof indice === "number"){ for(let i = 0; i<3; i++){ bloc[i+indice][numLigne].map( item => ( ligne.push(item) )); } }
    else{ console.log("erreur"); }

    return ligne;
}

const sudokuChiffreAleatoir = (nbChiffre) => {
    let tableauSudoku = TableauSudokuVide(" ");
    let numBloc = 0, numColonne = 0, numLigne = 0, chiffre = 0;
    let ligne = null, colonne = null;
    let indice = 0;
    while(indice < nbChiffre){
        chiffre = chiffreAleatoire(1,9);
        numBloc = chiffreAleatoire(0,8);
        numColonne = chiffreAleatoire(0,2); 
        numLigne = chiffreAleatoire(0,2);
        if(  tableauSudoku[numBloc][numLigne][numColonne] === " "){
            ligne = tableauLigne(numBloc, numLigne, tableauSudoku);
            colonne = tableauColonne(numBloc, numColonne, tableauSudoku);
            if( valideChiffre(chiffre, tableauSudoku[numBloc], ligne, colonne) ){
                tableauSudoku[numBloc][numLigne][numColonne] = chiffre;
                indice ++;
            }
        }
    }
    return tableauSudoku;
}

function resolutionSolutionUnique( grille, chemin, posibility, trouver ){
    let ligne = null, colonne = null;
    let chiffreDispo = null;
    let changement = false;
    let gagner = true;

    for(let numBloc = 0; numBloc < 9; numBloc++){
        for(let numLigne = 0; numLigne < 3; numLigne++){
            for(let numColonne = 0; numColonne < 3; numColonne++){
                if( grille[numBloc][numLigne][numColonne] === " " ){
                    ligne = tableauLigne(numBloc, numLigne, grille);
                    colonne = tableauColonne(numBloc, numColonne, grille);
                    chiffreDispo = chiffresPossible(grille[numBloc], ligne, colonne);
                    if(chiffreDispo.length === 1){ 
                        if( chemin.length > 0 ){ chemin[chemin.length-1].push( [numBloc, numLigne, numColonne] ); }
                        grille[numBloc][numLigne][numColonne] = chiffreDispo[0]; 
                        changement = true;
                    }
                    else if( chiffreDispo.length > 1 && !changement ){ posibility.push( [ chiffreDispo, [numBloc, numLigne, numColonne] ]); }
                    if(grille[numBloc][numLigne][numColonne] === " "){ gagner = false; }
                }
            }
        }
    }
    if(gagner){ trouver.push("bonjour"); }
    return changement;
}


function trierParTaille( posibility ){
    let tab = [];
    let tabTrie = [];
    for(let i = 0; i<10; i++){ tab.push([]); }
    for(let i = 0; i<posibility.length; i++){ tab[posibility[i][0].length - 1].push(posibility[i]); }
    for(let i = 0; i<tab.length; i++){
        for(let j=0; j<tab[i].length; j++){
            if(tab[i][j].length > 0){ tabTrie.push(tab[i][j]); }
        }
    }
    return tabTrie;
}

function verificationGagner(grille){
    let ligne = null, colonne = null;
    let validation = true;
    let chiffre = null;


    for(let numBloc = 0; numBloc < 9 && validation; numBloc++){
        for(let numLigne = 0; numLigne < 3 && validation; numLigne++){
            for(let numColonne = 0; numColonne < 3 && validation; numColonne++){
                if(grille[numBloc][numLigne][numColonne] === " "){ validation = false; }
                else{
                    chiffre = grille[numBloc][numLigne][numColonne];
                    grille[numBloc][numLigne][numColonne] = " ";
                    ligne = tableauLigne(numBloc, numLigne, grille);
                    colonne = tableauColonne(numBloc, numColonne, grille);
                    if( !valideChiffre(chiffre, grille[numBloc], ligne, colonne) ){ validation = false; }
                    grille[numBloc][numLigne][numColonne] = chiffre;
                }
            }
        }
    }
    if(!validation){ validation = undefined; }
    return validation;
}

// Fonction permetant de suprimer les cellules de la grille present dans le chemin
function removeValue(newBloc, chemin){
    for(let i = 1; i<chemin.length; i++){
        newBloc[chemin[i][0]][chemin[i][1]][chemin[i][2]] = " ";
    }
}


function actuChemin(grille, chemin, posibility, choix){
    let infoBloc = null;
    if(choix){ 
        posibility = trierParTaille(posibility); 
        chemin.push( posibility[0] );
    }
    infoBloc = chemin[chemin.length-1][1];
    grille[infoBloc[0]][infoBloc[1]][infoBloc[2]] = chemin[chemin.length-1][0][0];
}

function presTretement(grille, chemin, posibility, trouver){
    let outBoucle = false;
    let changement = true;
    while(changement){ 
        posibility = [];
        changement = resolutionSolutionUnique(grille, chemin, posibility, trouver);
    }
    if(trouver.length > 0){ outBoucle = true; }
    else if(posibility.length > 0){ actuChemin(grille, chemin, posibility, true); }

    return outBoucle;
}

function resolutionTotal( grille ){
    let chemin = [], posibility = [];
    let outBoucle = false;
    let flag = true;
    let gagner = false;
    let trouver = [];

    outBoucle = presTretement(grille, chemin, posibility, trouver);

    while(!outBoucle){
        outBoucle = presTretement(grille, chemin, posibility, trouver);
        if( posibility.length === 0 && chemin.length > 0 && trouver.length === 0){
            if(chemin[chemin.length -1][0].length > 0){
                flag = true;
                let n = chemin.length;
                for(let i=0; i<n && flag; i++){
                    if(chemin.length > 0){
                        removeValue(grille, chemin[chemin.length-1]);
                        if(chemin[chemin.length-1][0].length > 1){
                            flag = false;
                            chemin[chemin.length -1] = [chemin[chemin.length-1][0], chemin[chemin.length-1][1]];
                            chemin[chemin.length -1][0].shift();
                        }
                        else{ chemin.pop(); }
                    }
                    else{ 
                        flag = false; 
                        outBoucle = true;
                    }
                }
                if(chemin.length > 0){ actuChemin(grille, chemin, posibility, false); }
                else{ outBoucle = true; }
            }
        }
        else{ outBoucle = true; }
    }
    if(trouver.length > 0){ gagner = true; }
    return gagner;
}


function genereChiffreCacher(newGrille, cacher){
    let numBloc = 0, numColonne = 0, numLigne = 0;
    let indice = 0;
    while(indice < cacher){
        numBloc = chiffreAleatoire(0,8);
        numColonne = chiffreAleatoire(0,2); 
        numLigne = chiffreAleatoire(0,2);
        if(  newGrille[numBloc][numLigne][numColonne] !== " "){
            newGrille[numBloc][numLigne][numColonne] = " ";
            indice ++;
        }
    }
    return newGrille;
}

function posibility(grille, infoBloc){
    let ligne = tableauLigne(infoBloc[0], infoBloc[1], grille);
    let colonne = tableauColonne(infoBloc[0], infoBloc[2], grille);
    return chiffresPossible(grille[infoBloc[0]], ligne, colonne);
}






/*

var sudo = sudokuChiffreAleatoir(15);

var sudo1 = copieTableauSudo(sudo);


resolutionTotal(sudo1);

afficheDeuxGrille(sudo, sudo1);*/

export { posibility ,genereChiffreCacher,sudokuChiffreAleatoir, copieTableauSudo, resolutionTotal, verificationGagner, TableauSudokuVide, afficheGrille };