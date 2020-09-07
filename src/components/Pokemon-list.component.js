import React from 'react';
import PokemonComponent from './Pokemon.component'

const PokemonListComponent = ({ pokemonList, unitWidth, unitHeight, unitImagePadding, unitFontSize, unitBorderRadius }) => {
    return (
        <div className="pokemon-list-wrapper">
        {
            pokemonList.map(el => <PokemonComponent borderRadius={unitBorderRadius} padding={unitImagePadding} fontSize={unitFontSize} width={unitWidth} height={unitHeight} key={el.id} pokemon={el}/>)
        }
        </div>
    )
}

export default PokemonListComponent
