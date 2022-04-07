import React from 'react';
import { Link } from 'react-router-dom';
import './pokedexItem.css';
import Label from '../label/Label';

const Pokemon = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon?.id}`} className='card-container'>
      <div className='card-content'>
        <div className='types'>
          {
              pokemon ? pokemon.types.map((type, index) => (
                  <Label key={type.type.name+index} item={type.type.name} />
              )) : <span>No data loaded</span>
          }
        </div>
        <span> <b>N°Dex:</b> {pokemon?.id}</span>
        <img className='card-image' alt='pokemon' src={pokemon?.sprites.other.dream_world.front_default}/>
      </div>
      <h2 className='pokemon-name' >{pokemon?.name}</h2>
    </Link>
  )
}

export default Pokemon