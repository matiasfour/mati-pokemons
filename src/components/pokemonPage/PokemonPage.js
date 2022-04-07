import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Label from '../label/Label';
import './pokemonPage.css'
import { getPokemon } from '../../api/pokemon';
import PokedexItem from '../pokedexItem/PokedexItem';
import { Link } from 'react-router-dom';

const PokemonPage = () => {
  
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState();

  
  const getPokemonCb = useCallback(async () => {
    setPokemon(await getPokemon(pokemonId));
    }, [pokemonId]
  );

  useEffect(() => {
    getPokemonCb();
  }, [getPokemonCb, pokemonId]);

  return (
    <div className='pokemon-content' >  
      <Link to={`/`} className="back-button"> &#10094; Back to Pokedex</Link>
      <div className='pokemon-main-info' >
        <div className='pokemon-image-wrapper'>
          <img
            className='pokemon-info-image' 
            src={pokemon?.sprites.other.dream_world.front_default} 
            alt='pokemon'/>
        </div>
         <div className='habitats' >
           <h1 className='pokemon-title' >{pokemon?.name}</h1>
           {pokemon?.locations.length > 0 && 
            <div className='habitats-container' >
                <h2>Habitats:</h2>
                <div className='location-container'>
                  {
                    pokemon.locations.map(location => (
                        <Label key={location.location_area.name} item={location.location_area.name}/>
                    )) 
                  }
                </div>
            </div>
           }             
         </div>
      </div>
      <div className='pokemon-description'>
        <h3>Description: </h3>
        <div className='description-row-container'>
          <div className='description-row' >
             <label>Name:</label> 
             <span>{pokemon?.description.name}</span>     
          </div>
          <div className='description-row'>
             <label>Color:</label> 
             <span>{pokemon?.description.color.name}</span>     
          </div>
          <div className='description-row'>
             <label>Capture Rate:</label> 
             <span>{pokemon?.description.capture_rate}</span>     
          </div>
          <div className='description-row'>
             <label>Base Happiness:</label> 
             <span>{pokemon?.description.base_happiness}</span>     
          </div>
          <div className='description-row'>
             <label>Growth Rate:</label> 
             <span>{pokemon?.description.growth_rate.name}</span>     
          </div>    
        </div>  
      </div>
      <div className='pokemon-evolution-chain'>
          <h3>Evolution Chain</h3>
          <div className='chain'>
            {
              pokemon?.evolutions.length > 0 ? pokemon.evolutions.map((evo, index) =>(
                <PokedexItem key={`${evo.name}-${index}`} pokemon={evo} />
              )) : <span>No data loaded</span>
            }
          </div>
      </div>
    </div>
  )
}

export default PokemonPage