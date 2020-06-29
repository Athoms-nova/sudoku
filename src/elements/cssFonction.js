function styleBloc(grille){
    let style = {};

    for(let numB = 0; numB < 9; numB++){
        for(let numL=0; numL < 3; numL++){
            for(let numC =0; numC < 3; numC++){
                if(grille[numB][numL][numC] === " "){
                    style["case"+numB+""+numL+""+numC] = {
                        backgroundColor : "white",
                        border : "1px solid black",
                        fontWeight : "normal",
                        color : "black"
                    };
                }
                else{
                    style["case"+numB+""+numL+""+numC] = {
                        backgroundColor : "white",
                        border : "1px solid black",
                        fontWeight : "bold",
                        color : "black"
                    };
                }
            }
        }
    }
    return style;
}

function copieObjet(tab){
    let style = {};
    for(let numB = 0; numB < 9; numB++){
        for(let numL=0; numL < 3; numL++){
            for(let numC =0; numC < 3; numC++){ style["case"+numB+""+numL+""+numC] = tab["case"+numB+""+numL+""+numC]; }
        }
    }
    return style;
}


export {copieObjet, styleBloc};