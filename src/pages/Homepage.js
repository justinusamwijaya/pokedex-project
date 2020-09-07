import React, { useState, useEffect, useRef } from 'react';
import PokemonListComponent from '../components/Pokemon-list.component'
import LoadingComponent from '../components/Loading.component'
import mobileMenu from '../mobile-menu.svg';
import { useLazyQuery } from "react-apollo";
import gql from "graphql-tag";

const attributes = [
    'Delete Search',
    'Normal',
    'Fire',
    'Fighting',
    'Water',
    'Flying',
    'Grass',
    'Poison',
    'Electric',
    'Ground',
    'Psychic',
    'Rock',
    'Ice',
    'Bug',
    'Dragon',
    'Ghost',
    'Dark',
    'Steel',
    'Fairy',
]

const GET_POKEMONS = gql`
query pokemons($first: Int!){
    pokemons(first: $first) {
        id
        number
        name
        image
        types
    }
}
`

function HomepageComponent() {

    const [getCount, setGetCount] = useState(15)
    const [pokemonList, setPokemonList] = useState([])
    const [nameSearch, setNameSearch] = useState('')
    const [keepLoading, setKeepLoading] = useState(true)
    const [attributeMode, setAttributeMode] = useState(false)
    const [buttonAttributeText, setButtonAttributeText] = useState('Attribute')
    const [attributeSearch, setAttributeSearch] = useState(null)
    const [mobileMenuMode, setMobileMenuMode] = useState(false);
    
    let homeElement = useRef();

    const [
        getPokemons,
        { loading, data }
    ] = useLazyQuery(GET_POKEMONS, {
        variables: {first: getCount}
    })

    useEffect(() => {
        getPokemons();
    }, [getCount])

    useEffect(() => {
        if(data) {
            if(pokemonList.length > 0 && data.pokemons[data.pokemons.length - 1].id == pokemonList[pokemonList.length - 1].id) setKeepLoading(false)
            setPokemonList(data.pokemons)
        }
    }, [data])

    useEffect(() => {

        let searchResult
        let keepSearching = false

        if(attributeSearch) {
            searchResult = pokemonList.filter(el => el.types.indexOf(attributeSearch) + 1)
            keepSearching = true
        } else {
            searchResult = pokemonList.filter(el => el.name.toLowerCase().indexOf(nameSearch) + 1)
            keepSearching = true
        }
        
        if(keepSearching && searchResult.length <= 12 && keepLoading) setGetCount(getCount + 10)
    }, [pokemonList])

    useEffect(() => {
        const handleScroll = ()=>{if(homeElement.current && !loading){
            if ( 
                (window.innerHeight + window.scrollY) >= 
                document.getElementById('load_more').offsetTop - 600 &&
                homeElement.current.clientHeight
            ) {
                if(!loading && data && keepLoading){
                    setGetCount(getCount + 10)
                }
            }
        }};

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    })

    return (
        <div className="homepage">
            <div className="display-mobile" style={{width: 70, height: 70, position: 'fixed', bottom: 60, right: 10, borderRadius: 1000, background: 'rgba(0, 0, 0, .3)' }}>
                <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <button className="mobile-menu" onClick={() => setMobileMenuMode(!mobileMenuMode)} style={{height: '80%', border: 0, background: 'none'}}>
                            <img className="logo" src={mobileMenu} />
                    </button>
                </div>
            </div>

            <div className="list-section">
                <div ref={homeElement}>
                    {pokemonList ? <PokemonListComponent pokemonList = {pokemonList.filter(el => el.name.toLowerCase().indexOf(nameSearch) + 1).filter(el1 => attributeSearch ? el1.types.indexOf(attributeSearch) + 1 : true)}/> : null}
                </div>
                <div id="load_more" style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                    {
                        loading ? <LoadingComponent width={80} height={80}></LoadingComponent> : null
                    }
                </div>
            </div>
            <div className="filter-section">
                    Search by Name
                    <input placeholder="search..." className="pokemon-input" value={nameSearch} onChange={e => {
                        setNameSearch(e.target.value.toLowerCase())
                        setAttributeMode(false)
                        setAttributeSearch('')
                        setButtonAttributeText('Attribute')
                        let searchResult = pokemonList.filter(el => el.name.toLowerCase().indexOf(e.target.value) + 1)

                        if (searchResult.length <= 12 && keepLoading) setGetCount(getCount + 10) 
                    }}/>

                    Search by Attributes
                    <button className="pokemon-input" style={{cursor: 'pointer'}} onClick={() => setAttributeMode(!attributeMode)}>{buttonAttributeText}</button>
                    {attributeMode ? <div style={{ height: 200, overflowY: 'auto', overflowX: 'hidden', border: '.2px solid rgba(0, 0, 0, .3)' }}>
                        {attributes.map(el => (<div onClick={() => {
                            setAttributeMode(false)
                            setButtonAttributeText(el)
                            setAttributeSearch(el)
                            setNameSearch('')

                            let searchResult = pokemonList.filter(el1 => el1.types.indexOf(el) + 1)

                            if (searchResult.length <= 12 && keepLoading) setGetCount(getCount + 10) 

                            if(el === 'Delete Search') {
                                setButtonAttributeText('Attribute')
                                setAttributeSearch('')
                            }
                        }} style={{ cursor: 'pointer', background: 'white', padding: 10}}>
                            {el}
                        </div>))}
                    </div> : null}
            </div>

            {
                mobileMenuMode ? <div className="display-mobile" style={{position: 'fixed', top: 0, right: 0, height: '50vh', width: '100vw', zIndex: 999, background: 'rgba(255, 255, 255, .9)', paddingTop: 70}}>
                     <p>Search by Name</p>
                    <input placeholder="search..." className="pokemon-input" value={nameSearch} onChange={e => {
                        setNameSearch(e.target.value.toLowerCase())
                        setAttributeMode(false)
                        setAttributeSearch('')
                        setButtonAttributeText('Attribute')
                        let searchResult = pokemonList.filter(el => el.name.toLowerCase().indexOf(e.target.value) + 1)

                        if (searchResult.length <= 12 && keepLoading) setGetCount(getCount + 10) 
                    }}/>

                    <p>Search by Attributes</p>
                    <button className="pokemon-input" style={{cursor: 'pointer'}} onClick={() => setAttributeMode(!attributeMode)}>{buttonAttributeText}</button>
                    {attributeMode ? <div style={{ height: 200, overflowY: 'auto', overflowX: 'hidden', border: '.2px solid rgba(0, 0, 0, .3)' }}>
                        {attributes.map(el => (<div onClick={() => {
                            setAttributeMode(false)
                            setButtonAttributeText(el)
                            setAttributeSearch(el)
                            setNameSearch('')

                            let searchResult = pokemonList.filter(el1 => el1.types.indexOf(el) + 1)

                            if (searchResult.length <= 12 && keepLoading) setGetCount(getCount + 10) 

                            if(el === 'Delete Search') {
                                setButtonAttributeText('Attribute')
                                setAttributeSearch('')
                            }
                        }} style={{ cursor: 'pointer', background: 'white', padding: 10}}>
                            {el}
                        </div>))}
                    </div> : null}
                </div> : ''
            }
        </div>
    );
}

export default HomepageComponent;
