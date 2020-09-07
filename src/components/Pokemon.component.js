import React from 'react';
import { Link } from 'react-router-dom';

const PokemonComponent = ({ pokemon, width, height, padding, fontSize, borderRadius }) => {
    return (<Link to={'/' + pokemon.id}><div style={{width, height, fontSize, borderRadius}} className="pokemon-wrapper">
        <div style={{padding}} className="pokemon-list-image-wrapper">
            <img style={{maxWidth: '100%', maxHeight: '100%'}} src={pokemon.image}/>
        </div>
        <div className="pokemon-list-name">
            {pokemon.name}
        </div>
    </div></Link>)
}

export default PokemonComponent;
