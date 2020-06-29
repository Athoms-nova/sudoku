import React from 'react';

const MiniBloc = ({bloc, numBloc, cssBloc, onClickCelle}) => {
    let key = 0;
    let numLingne = 0, numColonne = 0;

    return(
        <div className="Bloc">
            {bloc.map(ligne => (
                <ul key={numLingne++} colonne={numColonne=0}>
                    {ligne.map(item => (
                        <li key={key++} 
                            onClick = {onClickCelle} 
                            style={cssBloc["case"+(numBloc-1)+""+(numLingne-1)+""+(numColonne)]}
                            className={"case"+(numBloc-1)+""+(numLingne-1)+""+(numColonne++)} 
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
}



export default MiniBloc;