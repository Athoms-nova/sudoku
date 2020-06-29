import React from 'react';
import MiniBloc from './miniBloc';

const Grille = ({grille, cssBloc, onClickCelle}) => {
    let indice = 0;

    return(
        <div id="Grille">
            {grille.map(bloc => (
                <MiniBloc 
                    key={indice++} bloc={bloc} numBloc={indice} 
                    cssBloc={cssBloc}
                    onClickCelle={onClickCelle}
                />
            ))}
        </div>
    );
}


export default Grille;