import React, { useState, useEffect } from 'react';
import LoadingComponent from '../components/Loading.component'
import { useLazyQuery } from "react-apollo";
import PokemonListComponent from '../components/Pokemon-list.component'
import gql from "graphql-tag";

const GET_POKEMON_BY_ID = gql`
query pokemon($id: String){
    pokemon(id: $id) {
        id
        number
        name
        types
        resistant
        weaknesses
        image
        classification
        height {
            minimum
            maximum
        }
        weight {
            minimum
            maximum
        }
        attacks {
            fast {
                name
                type
                damage
            }
            special {
                name
                type
                damage
            }
        }
        evolutions {
            id
            number
            name
            image
        }
    }
}
`

const DetailPage = ({ match }) => {

    const [pokemon, setPokemon] = useState(null)

    const [
        getPokemonById,
        { loading, data }
    ] = useLazyQuery(GET_POKEMON_BY_ID, {
        variables: {id: match.params.id}
    })

    useEffect(() => {
        getPokemonById()
    },[])

    useEffect(() => {
        if(data) setPokemon(data.pokemon)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }, [data])

    return (
        <div style={{width: '100%', height: '100vh'}}>
            {
                pokemon ? 
                    <div style={{width: '100%', height: '100%', paddingTop: 150}}>
                        <div style={{zIndex: 999, position: 'fixed', top: 0, left: 0 }} className="detail-title">
                            {pokemon.name} <span style={{ color: 'rgba(255, 255, 255, .6)', marginLeft: 5 }}> #{pokemon.number}</span>
                        </div> 
                        <div className="detail-section">
                            <div className="detail-image-pokemon">
                                <img src={pokemon.image}/>
                            </div>
                            <div className="detail-evo-pokemon">
                                <div style={{textAlign: 'left', background: 'black', color: 'white', padding: 20}}>
                                    Evolutions
                                </div>
                                <div style={{padding: 20}}>
                                    {pokemon.evolutions ? <PokemonListComponent unitBorderRadius={4} unitImagePadding={10} unitFontSize={13} unitWidth={75} unitHeight={130} pokemonList={pokemon.evolutions}/> : 'This Pokemon Has No Evolution'}
                                </div>
                            </div>
                        </div>
                        <div className="detail-section">
                            <div className="detail-info-section">
                                <div className="title">
                                    Weight Range
                                </div>
                                <div className="info">{pokemon.weight.minimum} - {pokemon.weight.maximum}</div>
                            </div>
                            <div className="detail-info-section">
                                <div className="title">
                                    Height Range
                                </div>
                                <div className="info">{pokemon.height.minimum} - {pokemon.height.maximum}</div>
                            </div>
                            <div className="detail-info-section">
                                <div className="title">
                                    Classification
                                </div>
                                <div className="info">{pokemon.classification}</div>
                            </div>
                            <div className="detail-info-section">
                                <div className="title">
                                    Types
                                </div>
                                <div className="info">{pokemon.types.join(', ')}</div>
                            </div>
                            <div className="detail-info-section">
                                <div className="title">
                                    Fast Attacks
                                </div>
                                <div className="info">     
                                    <ul>
                                        {pokemon.attacks.fast.map(el => <li>{el.name} ({el.type})</li>)}
                                    </ul>     
                                </div>
                            </div>
                            <div className="detail-info-section">
                                <div className="title">
                                    Special Attacks
                                </div>
                                <div className="info">     
                                    <ul>
                                        {pokemon.attacks.special.map(el => <li>{el.name} ({el.type})</li>)}
                                    </ul>     
                                </div>
                            </div>
                            <div className="detail-info-section">
                                <div className="title">
                                    Resistances
                                </div>
                                <div className="info">     
                                    <ul>
                                        {pokemon.resistant.map(el => <li>{el}</li>)}
                                    </ul>     
                                </div>
                            </div>
                            <div className="detail-info-section">
                                <div className="title">
                                    Weaknesses
                                </div>
                                <div className="info">     
                                    <ul>
                                        {pokemon.weaknesses.map(el => <li>{el}</li>)}
                                    </ul>     
                                </div>
                            </div>
                        </div>
                    </div>
                : ''
            }
        </div>
    )
}

export default DetailPage
